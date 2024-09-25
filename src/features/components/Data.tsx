import React, { CSSProperties } from "react";
import { useGetDataQuery } from "./ApiSlice";
import _ from "lodash";
import "./data.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function Data() {
  const { data: datas, error, isLoading } = useGetDataQuery("");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: CSSProperties;
    data: any[];
  }) => {
    const item = data[index];
    return (
      <div className="row" key={item.id} style={style}>
        {_.map(_.keys(item), (key) => (
          <div className="cell" key={key}>
            {_.toString(item[key])}
          </div>
        ))}
      </div>
    );
  };

  return (
      <div>
        <div className="header-row">
          {Object.keys(datas[0]).map((item, i) => (
            <th className="header" key={i}>
              {item}
            </th>
          ))}
        </div>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              height={height * 10}
              itemCount={datas.length}
              itemSize={height}
              width={width}
              itemData={datas}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
  );
}

export default Data;
