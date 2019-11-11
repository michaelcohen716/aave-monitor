import React from "react";
import "./common.css";

function PanelContainer({
  children,
  headline,
  height,
  views,
  setView,
  activeView
}) {
  return (
    <div
      className="panel-container w-100 d-flex flex-column"
      style={{ height }}
    >
      {views && views.length ? (
        <div className="views header w-100 d-flex justify-content-center">
          {views.map((view, i) => {
            const onClick = () => setView(view);
            return (
              <div
                key={i}
                className={`m-2 view ${
                  view === activeView ? "active-view" : ""
                }`}
                onClick={onClick}
              >
                {view}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto p-3 header w-100">{headline}</div>
      )}
      {children}
    </div>
  );
}

export default PanelContainer;
