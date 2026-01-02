import type { MouseEvent } from 'react';
import './Tabs.scss';

type TabListProps = {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
};

export const TabList = ({ tabs, active, onChange }: TabListProps) => {
  const handleTabClick = (event: MouseEvent<HTMLButtonElement>) => {
    const tab = event.currentTarget.dataset.tab;
    if (tab) {
      onChange(tab);
    }
  };

  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tabs__tab ${tab === active ? 'is-active' : ''}`.trim()}
          onClick={handleTabClick}
          type="button"
          role="tab"
          aria-selected={tab === active}
          data-tab={tab}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
