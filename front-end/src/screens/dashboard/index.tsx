import { Button, Divider, Input } from "antd";
import { useRef, useState } from "react";
import { updateGroupMemberList, sendGroupMessage, getSignInList } from "utils/request";
import styled from "@emotion/styled";
import { getTimeOfToday, useInTimeRange, useCountDown, useCurrentTime } from "../../utils/time";
import { TimeLabel, TitleLabel } from "./time-label";
import { signInEndAt, signInStartAt } from "../../config/schedule";
import { SignInList } from "./sign-in-list";

export const DashBoard = () => {

  const [text, setText] = useState("");

  const currentTime = useCurrentTime();

  const targetValue = useRef(getTimeOfToday(signInStartAt.getHours(), signInStartAt.getMinutes(), signInStartAt.getSeconds()));
  const { countDownTime, finished } = useCountDown(targetValue.current);

  const inRange = useInTimeRange(signInStartAt, signInEndAt);

  return (
    <Container>
      <TitleLabel label={

      inRange ?

        `签到正在进行中，快去签到！` :

        `记得今天${
          signInStartAt.getHours() !== 0 ?
            `${signInStartAt.getHours()}点` : ""
        }${
          signInStartAt.getMinutes() !== 0 ?
            `${signInStartAt.getMinutes()}分` : ""
        }来群里签到哦!`

      } />
      <TimeLabelContainer>
        <TimeLabel label={"当前时间:"} time={currentTime}/>
        {
          inRange ?
            <TimeLabel label={"距离签到结束:"} time={countDownTime}/> :
            <TimeLabel label={"距离下一次签到:"} time={countDownTime}/>
        }
      </TimeLabelContainer>

      <ListDivider />

      <SignInListContainer>
        <SignInList />
      </SignInListContainer>

    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ListDivider = styled(Divider)`
  margin: 1rem auto;
  width: 50rem;
`

const TimeLabelContainer = styled.div`
  margin: auto;
  display: flex;
  width: 100rem;
  justify-content: space-around;
`

const SignInListContainer = styled.div`
  margin: 2rem auto 0 auto;
  width: 70rem;
`