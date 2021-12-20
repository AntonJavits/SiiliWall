/* eslint-disable global-require */
import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProjectPage from "../pages/ProjectPage";
import BoardPage from "../pages/BoardPage";
import LandingPage from "../pages/LandingPage";

export default function Routes() {
  const boardMatch = useRouteMatch("/boards/:id");
  const projectMatch = useRouteMatch("/projects/:id");
  const { v4: uuid } = require("uuid");
  const eventId = uuid();

  useEffect(() => {
    window.localStorage.setItem("eventId", eventId);
  }, [eventId]);

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      {projectMatch && (
        <Route path="/projects/:id">
          <ProjectPage id={projectMatch.params.id} eventId={eventId} />
        </Route>
      )}
      {boardMatch && (
        <Route exact path="/boards/:id" >
          <BoardPage id={boardMatch.params.id} eventId={eventId} />
        </Route>
      )}
    </Switch>
  );
}
