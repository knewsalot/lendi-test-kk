import React, { FC, useContext, useReducer } from "react";
import { useState } from 'react';
import { AppCtx, AppointmentContextType } from '../../Root';

export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
  // updateAppointment( appointments: {id: number, brokerId: number, date: string }): FC;
}


const Broker = (broker: BrokerProps) => {
  // get structure of context to update...
  const { updateAppointment, resetAppointment } = useContext(AppCtx) as AppointmentContextType

  var [showAppts, setShowAppts] = useState(true)

  return (
    <li>
      {broker.broker.name}
      <br />
      {
        showAppts ?
          <div>Appointments:
            <button test-id='broker-hide-appointments-button' onClick={() => { setShowAppts(false), resetAppointment }}>Hide appointments</button>
            <ul test-id='broker-appointments-list'>
              {
                broker.broker.appointments.map((apt) => {
                  return <li key={apt.id} onClick={() => updateAppointment({ name: broker.broker.name, ...apt})} >{apt.date}</li>
                })
              }
            </ul>
          </div>
        :
          <button test-id={'broker-show-appointments-button'} onClick={() => setShowAppts(true)}>Show appointments</button>
      }

    </li>
  );
};

export default Broker;
