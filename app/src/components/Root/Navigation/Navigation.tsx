import React, { useContext } from "react";
import styled from "styled-components";
import { AppCtx, AppointmentContextType } from '../Root';

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`;

const Navigation = () => {
  const { appointment } = useContext(AppCtx) as AppointmentContextType

  return (
    <Wrapper>
      <strong>
        {
          appointment.date && appointment.name && <div>Currently selected appointment: {appointment.date} with {appointment.name}</div>
        }
      </strong>
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  );
};

export default Navigation;
