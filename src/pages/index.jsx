import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@remix-run/react'
import {
  BookOpen,
  Building2,
  ChevronRight,
  GraduationCap,
  LayoutGrid,
  MapPin,
  MonitorPlay,
  School,
  Users,
} from 'lucide-react'

export default function Home() {
  const schools = [
    {
      zone: 'Srinagar',
      constituency: 'Lal Chowk',
      name: 'Boys Middle School Rajbagh',
      code: '01030100602',
    },
    {
      zone: 'Hawal',
      constituency: 'Zadibal',
      name: 'Boys Middle School Soura',
      code: '01030101901',
    },
    {
      zone: 'Gulab bagh',
      constituency: 'Hazratbal',
      name: 'BMS Zakura',
      code: '01030700604',
    },
    {
      zone: 'Rainawari',
      constituency: 'Hazratbal',
      name: 'BMS Panjkerwari',
      code: '01031001606',
    },
    {
      zone: 'Batamaloo',
      constituency: 'Khanyar',
      name: 'GMS Saidakdal',
      code: '01031001213',
    },
    {
      zone: 'Eidgah',
      constituency: 'Iddgah',
      name: 'GMS Barzulla',
      code: '01030300702',
    },
    {
      zone: 'Nishat',
      constituency: 'Central Shalteng',
      name: 'BMS Batamaloo',
      code: '01030401801',
    },
    {
      zone: 'Zaldagar',
      constituency: 'Central Shalteng',
      name: 'MS Khojabagh Maloora',
      code: '01030400102',
    },
    {
      zone: 'Lal Chowk',
      constituency: 'Iddgah',
      name: 'BMS NOorbagh',
      code: '01030401202',
    },
    {
      zone: 'Channapora',
      constituency: 'Khanyar',
      name: 'MS Kreshbal',
      code: '01030800504',
    },
    {
      zone: 'Nowgam',
      constituency: 'Iddgah',
      name: 'GMS New Theed',
      code: '01030800928',
    },
    {
      zone: 'Habba Kadal',
      constituency: 'Habba Kadal',
      name: 'BMS Q, D Pora',
      code: '01030901102',
    },
  ]

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <div className='flex items-center gap-2'>
            <School className='h-6 w-6' />
            <span className='text-xl font-bold'>Hybrid School</span>
          </div>
          {/* <nav className='hidden md:flex gap-6'>
            <Link
              to='#'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              Home
            </Link>
            <Link
              to='#features'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              Features
            </Link>
            <Link
              to='#mission'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              Mission
            </Link>
            <Link
              to='#schools'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              Schools
            </Link>
            <Link
              to='#contact'
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              Contact
            </Link>
          </nav> */}
          <div className='flex items-center gap-4'>
            <Link to='/login'>
              <Button size='sm' className='hidden md:flex'>
                Login
              </Button>
            </Link>
            {/* <Button size='sm'>Get Started</Button> */}
          </div>
        </div>
      </header>
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-12'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Connecting Classrooms Across Distances
                  </h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                    Our Hybrid School project bridges the gap between schools
                    with a central studio facilitating interactive class
                    sessions for remote participating schools.
                  </p>
                </div>
                {/* <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button size='lg'>
                    Learn More
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='lg'>
                    View Demo
                  </Button>
                </div> */}
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-lg'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/80 flex items-center justify-center animate-pulse'>
                      <School className='h-12 w-12 md:h-16 md:w-16 text-white' />
                    </div>
                  </div>
                  <div className='absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-background/80 to-transparent'></div>
                  <div className='grid grid-cols-3 gap-3 p-4 opacity-50'>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className='aspect-video rounded-md bg-primary/30'
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' className='w-full py-20 bg-muted/50'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground'>
                  Features
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Innovative Learning Environment
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our hybrid learning system combines the best of in-person and
                  remote education to create an engaging and effective learning
                  experience for all students.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10'>
              <div className='grid gap-6'>
                <div className='flex gap-4 items-start'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                    <MonitorPlay className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold'>Central Studio</h3>
                    <p className='text-muted-foreground'>
                      State-of-the-art central studio equipped with advanced
                      audio-visual technology for high-quality broadcasting of
                      lessons to remote schools.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                    <Users className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold'>Interactive Sessions</h3>
                    <p className='text-muted-foreground'>
                      Two-way communication allows students from remote schools
                      to actively participate in discussions and ask questions
                      in real-time.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                    <BookOpen className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold'>Shared Resources</h3>
                    <p className='text-muted-foreground'>
                      Access to a wide range of educational resources, including
                      digital libraries, interactive materials, and expert
                      educators.
                    </p>
                  </div>
                </div>
              </div>
              <div className='grid gap-6'>
                <div className='flex gap-4 items-start'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                    <GraduationCap className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold'>Expert Teachers</h3>
                    <p className='text-muted-foreground'>
                      Lessons delivered by specialized educators with expertise
                      in their subject areas, benefiting students across all
                      participating schools.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                    <LayoutGrid className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold'>Flexible Learning</h3>
                    <p className='text-muted-foreground'>
                      Adaptable system that can accommodate various teaching
                      methods and learning styles, ensuring every student can
                      benefit.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                    <Building2 className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold'>
                      Infrastructure Support
                    </h3>
                    <p className='text-muted-foreground'>
                      Technical assistance and infrastructure setup for all
                      participating schools to ensure seamless connectivity and
                      learning experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id='mission' className='w-full py-20'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid gap-10 md:gap-16 lg:grid-cols-2'>
              <div className='space-y-4'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
                  Our Mission
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Bridging Educational Gaps
                </h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed'>
                  Our mission is to provide equal access to quality education
                  for all students, regardless of their geographical location or
                  school resources. By connecting schools through our hybrid
                  learning system, we aim to standardize educational quality and
                  create opportunities for collaborative learning.
                </p>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button>Join Our Mission</Button>
                </div>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
                  Our Goals
                </div>
                <ul className='grid gap-4'>
                  <li className='flex items-start gap-2'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                      1
                    </div>
                    <div>
                      <h3 className='font-medium'>Equitable Education</h3>
                      <p className='text-sm text-muted-foreground'>
                        Ensure all students have access to the same quality of
                        education regardless of their school's location.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                      2
                    </div>
                    <div>
                      <h3 className='font-medium'>Resource Optimization</h3>
                      <p className='text-sm text-muted-foreground'>
                        Maximize the use of available educational resources by
                        sharing them across multiple schools.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                      3
                    </div>
                    <div>
                      <h3 className='font-medium'>Teacher Development</h3>
                      <p className='text-sm text-muted-foreground'>
                        Provide opportunities for teachers to specialize and
                        share their expertise with a wider audience.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start gap-2'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                      4
                    </div>
                    <div>
                      <h3 className='font-medium'>Community Building</h3>
                      <p className='text-sm text-muted-foreground'>
                        Foster connections between different school communities,
                        creating a larger educational ecosystem.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section id='schools' className='w-full bg-muted/50 py-20'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center mb-10'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground'>
                  Participating Schools
                </div>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                  Our Network of Schools
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  The following schools are part of our Hybrid Learning System
                  project in the Srinagar district.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {schools.map((school, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{school.name}</CardTitle>
                    <CardDescription>Zone: {school.zone}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center gap-2 mb-2'>
                      <MapPin className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>{school.constituency}</span>
                    </div>
                    {/* <div className='flex items-center gap-2 mb-2'>
                      <Users className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>
                        Enrollment: {school.enrollment} students
                      </span>
                    </div> */}
                    {/* <div className='flex items-center gap-2'>
                      <Building2 className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>
                        Building: {school.building}
                      </span>
                    </div> */}
                  </CardContent>
                  {/* <CardFooter>
                    <Button variant='outline' size='sm' className='w-full'>
                      View Details
                    </Button>
                  </CardFooter> */}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t py-6 md:py-0'>
        <div className='container mx-auto flex flex-col items-center justify-center gap-4 md:h-14 md:flex-row px-4'>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Hybrid School Project. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
