import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";

import Navigation from "./Navigation";
import AppointmentSelect from "./AppointmentSelect";

const Wrapper = styled.div`
  background-color: #fcfcfc;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 24px;
  width: 720px;
  box-shadow: 1px 1px 4px #d3d3d3;
  background-color: white;
  border-radius: 5px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 1 })`
  display: block;
  font-size: 36px;
  margin-bottom: 40px;
  margin-top: 20px;
`;

// added name as an afterthought for completeting step 4... 
export interface AppointmentContext {
  id: number,
  brokerId: number,
  date: string,
  name: string
}

export type AppointmentContextType = {
  appointment: AppointmentContext,
  updateAppointment: (appt : AppointmentContext) => void,
  resetAppointment: () => void,
}

export let AppCtx = createContext<AppointmentContextType | null>(null);

const Root = () => {
  const [currentAppointment, setCurrentAppointment] = useState({} as AppointmentContext)
  
  return (
    <Wrapper>
      <AppCtx.Provider value={ { appointment: currentAppointment, updateAppointment: (apt) => setCurrentAppointment(apt), resetAppointment: () => setCurrentAppointment({} as AppointmentContext)} }>
        <Navigation />
        <Content>
          <Heading>Amazing site</Heading>
          <AppointmentSelect />
        </Content>
      </AppCtx.Provider>
    </Wrapper>
  );
};

export default Root;
