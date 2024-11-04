import React from "react";

export const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <span className="text-slate-700">{description}</span>
      </div>
    </>
  );
};
