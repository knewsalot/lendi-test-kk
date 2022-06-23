import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppCtx, AppointmentContextType } from '../Root';

import Broker from "./Broker";

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

type BrokerAppointments = {
  id: number;
  name: string;
  appointments: {
    id: number;
    brokerId: number;
    date: string;
  }[];
}[];

/* Structure for both response are as follows (for reference)

  const brokers = [
    { id: 1, name: "Cam" },
    { id: 2, name: "Jam" },
    { id: 3, name: "Sam" },
    { id: 4, name: "Ham" },
  ];

  const appointments = [
    { id: 1, brokerId: 1, date: "15/10/2021" },
    { id: 2, brokerId: 3, date: "22/11/2021" },
    { id: 3, brokerId: 3, date: "23/11/2021" },
    { id: 4, brokerId: 4, date: "10/5/2021" },
    { id: 5, brokerId: 3, date: "10/5/2022" },
  ];
*/

// cleaner approach would be to separate out into separate file for all API calls
// async call that fetches broker information from the API
const getBrokers = async () => {
  var brokers : BrokerAppointments[]

  await axios
  .get("http://localhost:8080/brokers")
  .then(({ data }) => {
    // need to ensure api response maps correctly to broker structure
    return brokers = data.map((broker : BrokerAppointments) => {
      return {
        id: broker.id,
        name: broker.name,
        appointments: [],
      }
    })
  });

  return brokers
}

// async call that fetches appointment information
const getAppointments = async () => {
  let appts : BrokerAppointments['appointments']

  await axios
  .get("http://localhost:8080/appointments")
  .then(({ data }) => {
    return appts = data
  });

  return appts
}

const AppointmentSelect = () => {
  let appointments : BrokerAppointments['appointments'] = {} 
  let [brokerApps, setBrokerApps] = useState<BrokerAppointments | void>()

  const { appointment } = useContext(AppCtx) as AppointmentContextType

  useEffect(() => {
    try {
      // do the data transformation for brokers and appointments once both have returned
      let brokerRes = getBrokers();
      let appointmentRes = getAppointments();

      let brokers : BrokerAppointments[]

      brokerRes.then((result) => {
        brokers = result
      })

      appointmentRes.then((result) => {
        let appts = result

        // applying correct appointments to each broker based on brokerId from appointment
        for (var appointment of appts) {
          if (brokers !== undefined) {
            let broker = brokers.find( ({id})  => id == appointment.brokerId)
            if (broker !== undefined) {
              broker.appointments.push(appointment)
            }
          }
        }

        // set the state to update the front end
        setBrokerApps(brokers)
      })
    } catch {
      
    }
  }, [])

  // probably worth putting in a loading placeholder than displaying nothing for the broker's appointments...
  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {   
            brokerApps && brokerApps.map((broker) => ( <Broker key={broker.id} broker={broker} /> ))
          }
        </ul>
      </SideBar>
      <div>
        {
          appointment && 
          <div>
            <Heading>Appointment details</Heading>
            <div>
              <ul>ID: {appointment.id}</ul>
              <ul>BrokerID: {appointment.brokerId}</ul>
              <ul>Appointment Date: {appointment.date}</ul>
            </div>
          </div>
        }
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
