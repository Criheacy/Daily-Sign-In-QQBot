import styled from "@emotion/styled";
import { pad } from "../../utils/time";

export const TitleLabel = ({ label }: { label: string }) => {
  return (
    <Title>
      {label}
    </Title>
  );
};

export const TimeLabel = ({ time, label, showDate }: {
  time: Date,
  label?: string,
  showDate?: boolean,
}) => {
  return (
    <div>
      <Label>
        {label}
      </Label>
      <Time>
        {showDate ? `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${pad(time.getDate())} ` : null}
        {`${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`}
      </Time>
    </div>
  );
};

const Title = styled.div`
  margin: 3rem 0;
  font-size: 5rem;
  font-family: "华文中宋", monospace;
  text-align: center;
`;

const Label = styled.div`
  font-family: "华文中宋", monospace;
  font-size: 2.7rem;
  text-align: center;
`;

const Time = styled.div`
  font-family: Cambria, Arial, sans-serif;
  font-size: 5rem;
  text-align: center;
  margin-top: -1.5rem;
`;