import type { FC, ReactElement } from "react";
import { datedListSortHelper, datedListSortKeyToDateHelper } from "../../helpers/dated-list-sort";
import { dateToStringHelper } from "../../helpers/date-to-string";

type DateGroupedListItem = { date: Date; title: string };

type RenderGroupComponent = FC<{
  title: string;
}>;
type RenderItemComponent<Object extends DateGroupedListItem> = FC<Object>;

type DateGroupedListProps<Object extends DateGroupedListItem> = {
  items: Array<Object>;
  renderGroup?: RenderGroupComponent;
  renderItem?: RenderItemComponent<Object>;
};

const DateGroupedList = <Object extends DateGroupedListItem>({
  items,
  renderItem = (props) => <li>{props.title}</li>,
  renderGroup = (props) => (
    <ul>
      <span>{props.title}</span>
      <br />
      {props.children}
    </ul>
  ),
}: DateGroupedListProps<Object>): ReactElement => {
  const dateGroups = datedListSortHelper(items);
  const dates = Array.from(dateGroups.keys());

  const groups = dates.map((group) => {
    const date = datedListSortKeyToDateHelper(group);
    const groupTitle = dateToStringHelper(date);

    const RenderItem = renderItem;
    const items = Array.from(dateGroups.get(group) ?? []).map((item) => {
      return <RenderItem key={item.title} {...item} />;
    });

    const RenderGroup = renderGroup;

    return (
      <RenderGroup key={groupTitle} title={groupTitle}>
        {items}
      </RenderGroup>
    );
  });

  return <>{groups}</>;
};

export { DateGroupedList };
