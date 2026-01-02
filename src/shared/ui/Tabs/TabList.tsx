import './Tabs.scss';

type TabListProps = {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
};

export const TabList = ({ tabs, active, onChange }: TabListProps) => (
  <div className="tabs" role="tablist">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`tabs__tab ${tab === active ? 'is-active' : ''}`.trim()}
        onClick={() => onChange(tab)}
        type="button"
        role="tab"
        aria-selected={tab === active}
      >
        {tab}
      </button>
    ))}
  </div>
);
