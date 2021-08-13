import { useEffect, useRef, useState } from "react";
import { getSignInList } from "../../utils/request";
import { getTimeOfToday } from "../../utils/time";
import { signInStartAt } from "../../config/schedule";
import { List } from "antd";
import styled from "@emotion/styled";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone,
  QuestionCircleTwoTone
} from "@ant-design/icons";

type SignInState = "sign_in" | "leave" | "unknown";

interface SignInUser {
  user_id: string;
  user_card: string;
  sign_in_type: SignInState;
}

const SignInStateIcon = (state: SignInState) => {
  switch (state) {
    case "sign_in": return <CheckCircleTwoTone twoToneColor="#52C41A"/>;
    case "leave": return <MinusCircleTwoTone />;
    case "unknown": return <QuestionCircleTwoTone />;
    default: return <CloseCircleTwoTone twoToneColor="#EB2F2F"/>;
  }
}

export const SignInList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signInList = useRef([] as SignInUser[]);

  useEffect(() => {
    setIsLoading(true);
    getSignInList(getTimeOfToday(signInStartAt.getHours()))
      .then((response) => {
        signInList.current = response;
        console.log(signInList.current);
        setIsLoading(false);
      })
  }, []);

  return (
    <List dataSource={signInList.current}
          bordered
          header={
            <TitleInList>
              今日签到
            </TitleInList>
          }
          size={"small"}
          loading={isLoading}
          renderItem={item => (
            <List.Item>
              <TextInList>
                {SignInStateIcon(item.sign_in_type)}
                &nbsp;&nbsp;{item.user_card}
              </TextInList>
            </List.Item>
          )}/>
  )
}

const TitleInList = styled.div`
  font-family: "华文中宋", monospace;
  font-size: 2.2rem;
  color: #404040;
`

const TextInList = styled.div`
  font-family: "华文中宋", monospace;
  font-size: 1.8rem;
  color: #404040;
`