import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import useSWR from "swr";
import Head from "next/head";
function FilteredEventsPage(props) {
  const router = useRouter();

  const [loadedEvents, setLoadedEvents] = useState();
  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    "https://nextjs-course-587d2-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
      //console.log(data)
    }
  }, [data]);
  if (!loadedEvents) {
    return;
    <>
      {pageHeadData}
      <p className="center">Loading...</p>
    </>;
  }
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeadData}
        <p>Invalid filter. Please adjust your values!</p>
      </>
    );
  }
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  // if(props.hasError){
  //   return <p>Invalid filter.Please adjust your values</p>
  // }
  //const filteredEvents=props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return <>{pageHeadData}<p>No events found for the chosen filter!</p></>;
  }
  // const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      {pageHeadData}
      <EventList items={filteredEvents} />
    </>
  );
}
export default FilteredEventsPage;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     },
//   };
// }
