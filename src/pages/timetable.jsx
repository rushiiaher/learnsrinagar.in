import { useState, useEffect } from 'react'
import { query } from '@/lib/db'
import { useLoaderData } from '@remix-run/react'
import { format, isSameDay } from 'date-fns'
import { getUser } from '@/lib/auth'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VideoIcon, CalendarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export async function loader({ request }) {
  const user = await getUser(request)

  const [liveClasses] = await query(`
    SELECT z.*,
           s.name AS subject_name,
           c.name AS class_name,
           z.class_id,
           u.name AS teacher_name
    FROM live_classes z
    JOIN subjects s  ON z.subject_id = s.id
    JOIN classes c   ON z.class_id   = c.id
    JOIN users u     ON z.teacher_id = u.id
    ORDER BY z.start_time ASC
  `)

  return { liveClasses, user }
}

export default function Timetable() {
  const { liveClasses, user } = useLoaderData()
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  )
  const [timeSlots, setTimeSlots] = useState([])
  const [classesData, setClassesData] = useState([])
  const [teachersData, setTeachersData] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState('all')
  const [classTimeTable, setClassTimeTable] = useState({})
  const isTeacher = user && user.role_name === 'teacher'

  // Check if user has permission to join class (super_admin, school_admin, class_admin, teacher)
  const canJoinClass =
    user &&
    ['super_admin', 'school_admin', 'class_admin', 'teacher'].includes(
      user.role_name
    )

  useEffect(() => {
    // Filter classes by selected date
    const selectedDateObj = new Date(selectedDate)
    let filteredClasses = liveClasses.filter((cls) => {
      const classDate = new Date(cls.class_date)
      return isSameDay(classDate, selectedDateObj)
    })

    // Filter by user's class permissions
    if (user && user.class_ids) {
      const classIds = Array.isArray(user.class_ids)
        ? user.class_ids
        : user.class_ids.split(',').map((id) => parseInt(id.trim()))
      if (classIds.length !== 0) {
        filteredClasses = filteredClasses.filter((zc) =>
          classIds.includes(zc.class_id)
        )
      }
    }

    // If user is a teacher, only show their classes
    if (isTeacher) {
      filteredClasses = filteredClasses.filter(
        (zc) => zc.teacher_id === user.id
      )
    }

    // If not a teacher and a specific teacher is selected, filter by that teacher
    if (selectedTeacher !== 'all') {
      filteredClasses = filteredClasses.filter(
        (zc) => zc.teacher_id.toString() === selectedTeacher
      )
    }

    // Sort classes by time
    filteredClasses.sort((a, b) => {
      const timeA = new Date(`2000-01-01T${a.class_time}`).getTime()
      const timeB = new Date(`2000-01-01T${b.class_time}`).getTime()
      return timeA - timeB
    })

    // Extract unique teachers (only if not in teacher view)
    if (!isTeacher) {
      const uniqueTeachers = []
      const teacherMap = new Map()

      liveClasses.forEach((cls) => {
        if (!teacherMap.has(cls.teacher_id)) {
          teacherMap.set(cls.teacher_id, {
            id: cls.teacher_id,
            name: cls.teacher_name,
          })
          uniqueTeachers.push({
            id: cls.teacher_id,
            name: cls.teacher_name,
          })
        }
      })

      // Sort teachers by name
      uniqueTeachers.sort((a, b) => a.name.localeCompare(b.name))
      setTeachersData(uniqueTeachers)
    }

    // Extract unique time slots
    const uniqueTimeSlots = []
    const timeSlotMap = new Map()

    filteredClasses.forEach((cls) => {
      // Create a Date object with just the time portion
      const startTime = new Date(`2000-01-01T${cls.class_time}`)
      // Add duration to get end time
      const endTime = new Date(
        startTime.getTime() + cls.duration_minutes * 60000
      )

      const timeKey = `${format(startTime, 'h:mm')} - ${format(
        endTime,
        'h:mm'
      )}`

      if (!timeSlotMap.has(timeKey)) {
        timeSlotMap.set(timeKey, {
          key: timeKey,
          startTime,
          endTime,
          formattedTime: timeKey,
        })
        uniqueTimeSlots.push({
          key: timeKey,
          startTime,
          endTime,
          formattedTime: timeKey,
        })
      }
    })

    // Sort time slots chronologically
    uniqueTimeSlots.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime()
    )
    setTimeSlots(uniqueTimeSlots)

    // Extract unique classes
    const uniqueClasses = []
    const classMap = new Map()

    filteredClasses.forEach((cls) => {
      if (!classMap.has(cls.class_id)) {
        classMap.set(cls.class_id, {
          id: cls.class_id,
          name: cls.class_name,
        })
        uniqueClasses.push({
          id: cls.class_id,
          name: cls.class_name,
        })
      }
    })

    // Sort classes by name
    uniqueClasses.sort((a, b) => a.name.localeCompare(b.name))
    setClassesData(uniqueClasses)

    // Create timetable data structure
    const timetable = {}
    uniqueClasses.forEach((cls) => {
      timetable[cls.id] = {}
      uniqueTimeSlots.forEach((slot) => {
        timetable[cls.id][slot.key] = null
      })
    })

    // Fill in timetable with class data
    filteredClasses.forEach((cls) => {
      // Create Date objects with just the time portion
      const startTime = new Date(`2000-01-01T${cls.class_time}`)
      // Add duration to get end time
      const endTime = new Date(
        startTime.getTime() + cls.duration_minutes * 60000
      )

      const timeKey = `${format(startTime, 'h:mm')} - ${format(
        endTime,
        'h:mm'
      )}`

      timetable[cls.class_id][timeKey] = {
        id: cls.id,
        subject: cls.subject_name,
        teacher: cls.teacher_name,
        startTime,
        endTime,
        joinUrl: cls.join_url,
        description: cls.description,
      }
    })

    setClassTimeTable(timetable)
  }, [liveClasses, selectedDate, user, isTeacher, selectedTeacher])

  return (
    <div className='container mx-auto pb-10'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6'>
        <div className='flex items-center gap-2'>
          <h1 className='ml-2 pt-2 text-xl font-semibold'>Class Schedule</h1>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex items-center gap-2'>
            {/* <CalendarIcon className='h-4 w-4' /> */}
            <Input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='w-full sm:w-[200px]'
            />
          </div>

          {!isTeacher && teachersData.length > 0 && (
            <Select
              value={selectedTeacher}
              onValueChange={(value) => setSelectedTeacher(value)}
            >
              <SelectTrigger className='w-full sm:w-[240px]'>
                <SelectValue placeholder='Filter by Teacher' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Teachers</SelectItem>
                {teachersData.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Display selected date */}
      <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
        <span className='font-medium text-gray-700'>
          Showing schedule for: {format(new Date(selectedDate), 'dd/MM/yyyy')}
        </span>
      </div>

      {timeSlots.length > 0 && classesData.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='border border-gray-300 bg-gray-100 p-2 text-center font-medium text-sm'>
                  Class
                </th>
                {timeSlots.map((slot) => (
                  <th
                    key={slot.key}
                    className='border border-gray-300 bg-gray-100 p-2 text-center font-medium text-sm'
                  >
                    {slot.formattedTime}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classesData.map((cls) => (
                <tr key={cls.id}>
                  <td className='border border-gray-300 bg-gray-50 p-3 text-center font-medium'>
                    Class {cls.name}
                  </td>
                  {timeSlots.map((slot) => {
                    const classInfo = classTimeTable[cls.id]?.[slot.key]

                    if (!classInfo) {
                      return (
                        <td
                          key={slot.key}
                          className='border border-gray-300 p-4 text-center text-gray-400'
                        >
                          -
                        </td>
                      )
                    }

                    return (
                      <td
                        key={slot.key}
                        className='border border-gray-300 p-4 text-center'
                      >
                        <div className='font-medium'>{classInfo.subject}</div>
                        <div className='text-sm mt-1'>
                          ({classInfo.teacher})
                        </div>
                        {classInfo.description && (
                          <div className='text-xs text-gray-600 mt-1 italic'>
                            {classInfo.description}
                          </div>
                        )}
                        {canJoinClass && (
                          <div className='mt-3'>
                            <a
                              href={classInfo.joinUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                            >
                              <VideoIcon className='h-3.5 w-3.5 mr-1.5' />
                              Join Class
                            </a>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground border rounded-lg'>
          {isTeacher
            ? `You have no classes scheduled for ${format(
                new Date(selectedDate),
                'dd/MM/yyyy'
              )}.`
            : `No classes scheduled for ${format(
                new Date(selectedDate),
                'dd/MM/yyyy'
              )}.`}
        </div>
      )}
    </div>
  )
}
