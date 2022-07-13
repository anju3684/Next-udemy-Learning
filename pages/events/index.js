import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';



function AllEventsPage(props) {
  const router = useRouter();
 

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
    return (
      <>
      <EventsSearch  onSearch={findEventsHandler}/>
     <EventList items={props.events} />
      </>
    );
  }
  
  export default AllEventsPage;

  export async function getStaticProps(){
    const allEvents=await getAllEvents()
    return{
      props:{
        events:allEvents
      },
      revalidate:60
    }
  }