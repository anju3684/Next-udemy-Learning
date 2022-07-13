import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById ,getAllEvents} from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/evevnt-logistics'
import EventContent from '../../components/event-detail/event-content';

function EventDetailPage(props) {

  const event=  props.selectedEvent;

  if (!event) {
    return <p>Loading</p>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
  export default EventDetailPage;

  export async function getStaticProps(context){
    const eventId=context.params.eventId;
    const event=await getEventById(eventId)
    return{
      props:{
        selectedEvent:event
      },
      revalidate:30
    }
  }
export async function getStaticPaths(){
  const events=await getAllEvents()
  const paths=events.map(event=>({params:{eventId:event.id}}))
  return{
    paths:paths,
    fallback:'blocking'
  }

}