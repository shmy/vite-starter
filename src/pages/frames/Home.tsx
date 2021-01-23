import React, {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useRouteMatch} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Home: React.FC = () => {
  const match = useRouteMatch()!;
  const {t} = useTranslation();
  const a = useContext(UserContext)!;
  return <div>
    home
    {t('Welcome to React')}
    {t('a')}
    {JSON.stringify(a)}
    <p>{match.url}</p>
  </div>
};
export default Home;
