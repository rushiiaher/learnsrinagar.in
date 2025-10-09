import { useState } from 'react'
import { getUser } from '@/lib/auth'
import { query } from '@/lib/db'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { format, subDays, addDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CalendarIcon } from 'lucide-react'

export async function loader({ request }) {
  const user = await getUser(request)
  const role = user.role_name

  // For non-super_admin users, redirect to their respective pages
  if (role !== 'super_admin') {
    if (role == 'school_admin') {
      return redirect('/class-admin')
    } else if (role == 'class_admin') {
      return redirect('/attendance')
    } else if (role == 'teacher') {
      return redirect('/timetable')
    } else if (role == 'student') {
      return redirect('/attendance')
    } else if (role == 'parent') {
      return redirect('/attendance')
    }
  }

  // For super_admin, fetch all schools
  const [schools] = await query(
    `SELECT s.id, s.name, COUNT(DISTINCT c.id) as class_count
     FROM schools s
     LEFT JOIN student_profiles sp ON s.id = sp.schools_id
     LEFT JOIN classes c ON sp.class_id = c.id
     GROUP BY s.id, s.name
     ORDER BY s.name`
  )

  // Get all classes
  const [classes] = await query(
    `SELECT c.id, c.name, s.id as school_id, s.name as school_name
     FROM classes c
     JOIN student_profiles sp ON c.id = sp.class_id
     JOIN schools s ON sp.schools_id = s.id
     GROUP BY c.id, c.name, s.id, s.name
     ORDER BY s.name, c.name`
  )

  // Get attendance data by date for the past 30 days
  const [dailyAttendance] = await query(
    `SELECT 
       sa.date, 
       s.id as school_id,
       s.name as school_name,
       c.id as class_id,
       c.name as class_name,
       COUNT(CASE WHEN sa.status = 'present' THEN 1 END) as present_count,
       COUNT(CASE WHEN sa.status = 'absent' THEN 1 END) as absent_count,
       COUNT(CASE WHEN sa.status = 'late' THEN 1 END) as late_count,
       COUNT(sa.id) as total_count
     FROM student_attendance sa
     JOIN student_profiles sp ON sa.student_id = sp.user_id
     JOIN schools s ON sp.schools_id = s.id
     JOIN classes c ON sa.class_id = c.id
     WHERE sa.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
     GROUP BY sa.date, s.id, s.name, c.id, c.name
     ORDER BY sa.date DESC, s.name, c.name`
  )

  // Get feedback data aggregated by school and class
  const [feedbackData] = await query(
    `SELECT 
       s.id as school_id,
       s.name as school_name,
       c.id as class_id,
       c.name as class_name,
       pfi.section,
       AVG(pfi.rating) as avg_rating,
       COUNT(DISTINCT pf.id) as feedback_count
     FROM parent_feedback pf
     JOIN parent_feedback_items pfi ON pf.id = pfi.feedback_id
     JOIN users u ON pf.student_id = u.id
     JOIN student_profiles sp ON u.id = sp.user_id
     JOIN schools s ON sp.schools_id = s.id
     JOIN classes c ON sp.class_id = c.id
     GROUP BY s.id, s.name, c.id, c.name, pfi.section
     ORDER BY s.name, c.name, pfi.section`
  )

  return {
    user,
    schools,
    classes,
    dailyAttendance,
    feedbackData,
  }
}

export default function Dashboard() {
  const {
    user,
    schools = [],
    classes = [],
    dailyAttendance = [],
    feedbackData = [],
  } = useLoaderData()
  const [selectedSchool, setSelectedSchool] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 14),
    to: new Date(),
  })

  // Calculate average rating for a specific section
  const calculateAverageRating = (section) => {
    if (!feedbackData || feedbackData.length === 0) return 0

    // Filter by selected school and class, and by section
    const relevantFeedback = feedbackData.filter((item) => {
      const isMatchingSchool =
        selectedSchool === 'all' ||
        item.school_id?.toString() === selectedSchool
      const isMatchingClass =
        selectedClass === 'all' || item.class_id?.toString() === selectedClass
      const isMatchingSection = item.section === section

      return isMatchingSchool && isMatchingClass && isMatchingSection
    })

    if (relevantFeedback.length === 0) return 0

    // Calculate average
    const sum = relevantFeedback.reduce((acc, item) => {
      return acc + parseFloat(item.avg_rating || 0)
    }, 0)

    return sum / relevantFeedback.length
  }

  // Get count of feedback for a specific section
  const getFeedbackCount = (section) => {
    if (!feedbackData || feedbackData.length === 0) return 0

    // Filter by selected school and class, and by section
    const relevantFeedback = feedbackData.filter((item) => {
      const isMatchingSchool =
        selectedSchool === 'all' ||
        item.school_id?.toString() === selectedSchool
      const isMatchingClass =
        selectedClass === 'all' || item.class_id?.toString() === selectedClass
      const isMatchingSection = item.section === section

      return isMatchingSchool && isMatchingClass && isMatchingSection
    })

    if (relevantFeedback.length === 0) return 0

    // Sum up all feedback counts
    return relevantFeedback.reduce((acc, item) => {
      return acc + parseInt(item.feedback_count || 0)
    }, 0)
  }

  // Function to prepare data for the feedback chart
  const prepareFeedbackChartData = () => {
    if (!feedbackData || feedbackData.length === 0) return []

    // Filter based on selected school and class
    const filteredFeedback = feedbackData.filter((item) => {
      const isMatchingSchool =
        selectedSchool === 'all' ||
        item.school_id?.toString() === selectedSchool
      const isMatchingClass =
        selectedClass === 'all' || item.class_id?.toString() === selectedClass

      return isMatchingSchool && isMatchingClass
    })

    // Group by school and class
    const groupedData = {}

    filteredFeedback.forEach((item) => {
      const key = `${item.school_name} - ${item.class_name}`

      if (!groupedData[key]) {
        groupedData[key] = {
          name: key,
          school_id: item.school_id,
          class_id: item.class_id,
          academic: 0,
          behavioral: 0,
          satisfaction: 0,
          academic_count: 0,
          behavioral_count: 0,
          satisfaction_count: 0,
          feedback_count: item.feedback_count,
        }
      }

      // Add to the appropriate section
      if (item.section === 'academic') {
        groupedData[key].academic += parseFloat(item.avg_rating) || 0
        groupedData[key].academic_count += 1
      } else if (item.section === 'behavioral') {
        groupedData[key].behavioral += parseFloat(item.avg_rating) || 0
        groupedData[key].behavioral_count += 1
      } else if (item.section === 'satisfaction') {
        groupedData[key].satisfaction += parseFloat(item.avg_rating) || 0
        groupedData[key].satisfaction_count += 1
      }
    })

    // Calculate averages and convert to array
    return Object.values(groupedData).map((group) => {
      return {
        name: group.name,
        school_id: group.school_id,
        class_id: group.class_id,
        academic:
          group.academic_count > 0 ? group.academic / group.academic_count : 0,
        behavioral:
          group.behavioral_count > 0
            ? group.behavioral / group.behavioral_count
            : 0,
        satisfaction:
          group.satisfaction_count > 0
            ? group.satisfaction / group.satisfaction_count
            : 0,
        feedback_count: group.feedback_count,
      }
    })
  }

  // Filter classes based on selected school
  const filteredClasses =
    selectedSchool === 'all'
      ? classes
      : classes.filter((cls) => cls.school_id?.toString() === selectedSchool)

  // Generate chart data
  const chartData = dailyAttendance
    .filter((record) => {
      const recordDate = new Date(record.date)
      const isInDateRange =
        recordDate >= dateRange.from && recordDate <= dateRange.to

      const isMatchingSchool =
        selectedSchool === 'all' ||
        record.school_id?.toString() === selectedSchool

      const isMatchingClass =
        selectedClass === 'all' || record.class_id?.toString() === selectedClass

      return isInDateRange && isMatchingSchool && isMatchingClass
    })
    .reduce((acc, record) => {
      const date = format(new Date(record.date), 'MMM dd')

      const existingDateIndex = acc.findIndex((item) => item.date === date)

      if (existingDateIndex >= 0) {
        acc[existingDateIndex].present += record.present_count || 0
        acc[existingDateIndex].absent += record.absent_count || 0
        acc[existingDateIndex].late += record.late_count || 0
        acc[existingDateIndex].total += record.total_count || 0
      } else {
        acc.push({
          date,
          rawDate: new Date(record.date),
          present: record.present_count || 0,
          absent: record.absent_count || 0,
          late: record.late_count || 0,
          total: record.total_count || 0,
        })
      }

      return acc
    }, [])
    .sort((a, b) => a.rawDate - b.rawDate)

  // Handle date range selection
  const onDateRangeChange = (range) => {
    if (range.from) {
      // If only "from" is selected, limit range to 30 days
      if (!range.to) {
        const thirtyDaysLater = addDays(range.from, 30)
        const today = new Date()
        // Don't allow selecting future dates
        const limitedTo = thirtyDaysLater > today ? today : thirtyDaysLater
        setDateRange({ ...range, to: limitedTo })
      } else {
        setDateRange(range)
      }
    } else {
      setDateRange(range)
    }
  }

  return (
    <div className='container mx-auto pb-10'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-xl font-semibold'>Dashboard</h1>
        <div className='flex flex-col justify-end md:flex-row gap-4 mt-4'>
          {/* <div className='w-full md:w-1/3'> */}
          <Select
            value={selectedSchool}
            onValueChange={(value) => {
              setSelectedSchool(value)
              // Reset class selection when school changes
              if (value !== selectedSchool) {
                setSelectedClass('all')
              }
            }}
            defaultValue='all'
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a school' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Schools</SelectItem>
              {Array.isArray(schools) &&
                schools.map((school) => (
                  <SelectItem
                    key={school.id}
                    value={school.id ? school.id.toString() : ''}
                  >
                    {school.name} ({school.class_count || 0} classes)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {/* </div> */}

          {/* <div className='w-full'> */}
          <Select
            value={selectedClass}
            onValueChange={setSelectedClass}
            defaultValue='all'
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a class' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Classes</SelectItem>
              {Array.isArray(filteredClasses) &&
                filteredClasses.map((cls) => (
                  <SelectItem
                    key={cls.id}
                    value={cls.id ? cls.id.toString() : ''}
                  >
                    {cls.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {/* </div> */}

          <div className='w-full '>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                        {format(dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={onDateRangeChange}
                  numberOfMonths={2}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <h2 className='mt-8 mb-4 text-xl font-semibold'>Parent's Feedback</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Academic Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {calculateAverageRating('academic').toFixed(1)}/5.0
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              {getFeedbackCount('academic')} ratings from parents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Behavioral Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {calculateAverageRating('behavioral').toFixed(1)}/5.0
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              {getFeedbackCount('behavioral')} ratings from parents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Overall Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {calculateAverageRating('satisfaction').toFixed(1)}/5.0
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              {getFeedbackCount('satisfaction')} ratings from parents
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className='mt-8 mb-4 text-xl font-semibold'>Student's Attendance</h2>

      <Card>
        <CardContent className='pt-6'>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='present'
                  stroke='#10b981'
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  name='Present'
                />
                <Line
                  type='monotone'
                  dataKey='absent'
                  stroke='#ef4444'
                  strokeWidth={2}
                  name='Absent'
                />
                <Line
                  type='monotone'
                  dataKey='late'
                  stroke='#f59e0b'
                  strokeWidth={2}
                  name='Late'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {chartData.length === 0 && (
            <p className='text-center text-muted-foreground py-4'>
              No attendance data available for the selected criteria. Please
              adjust your filters.
            </p>
          )}
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Average Feedback Ratings by School and Class</CardTitle>
          <CardDescription>
            Shows the average ratings across different feedback categories
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={prepareFeedbackChartData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='name'
                  angle={-45}
                  textAnchor='end'
                  height={80}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  label={{
                    value: 'Average Rating (1-5)',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                  }}
                />
                <Tooltip
                  formatter={(value) => [value.toFixed(1), 'Average Rating']}
                />
                <Legend />
                <Bar dataKey='academic' name='Academic' fill='#8884d8' />
                <Bar dataKey='behavioral' name='Behavioral' fill='#82ca9d' />
                <Bar
                  dataKey='satisfaction'
                  name='Overall Satisfaction'
                  fill='#ffc658'
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {feedbackData.length === 0 && (
            <p className='text-center text-muted-foreground py-4'>
              No feedback data available. Parents need to submit feedback first.
            </p>
          )}
        </CardContent>
      </Card> */}
    </div>
  )
}
