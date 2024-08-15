"use client";

import { MdSchool } from "react-icons/md";
import { TbGrowth } from "react-icons/tb";
import { VscSymbolEvent } from "react-icons/vsc";
import { useGlobalContext } from "../context/globalState";
import { convertBytes } from "../utils";
import Widget from "../components/Widget";
import AuditRatio from "../components/AuditRatio";
import AuditInteraction from "../components/AuditInteraction";
import Audits from "../components/Audits";
import XpProgression from "../components/XpProgression";
import XpTransaction from "../components/XpTransaction";
import Loading from "../components/Loading";

export default function Dashboard() {
  const { User, XpTotal, loading } = useGlobalContext();

  if (loading) return <Loading />;

  if (!User || !User[0]) return <div>No user data available</div>;
  const totalXp = convertBytes(XpTotal.aggregate.sum.amount);
  const widgetData = [
    {
      id: 1,
      title: "Total XP",
      subtitle: totalXp || 0,
      icon: <TbGrowth className="h-7 w-7" />,
    },
    {
      id: 2,
      title: "Campus",
      subtitle: User[0].campus || 0,
      icon: <MdSchool className="h-7 w-7" />,
    },
    {
      id: 3,
      title: "Level",
      subtitle: User[0].events[0]?.level || 0,
      icon: <VscSymbolEvent className="h-7 w-7" />,
    },
  ];

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {widgetData.map((widgetItem) => (
          <Widget
            key={widgetItem.id}
            title={widgetItem.title}
            subtitle={widgetItem.subtitle}
            icon={widgetItem.icon}
          />
        ))}
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 ">
        <XpTransaction />
        <AuditInteraction />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <AuditRatio
          totalDown={User[0].totalDown || 0}
          totalUp={User[0].totalUp || 0}
        />
        <Audits />
        <XpProgression />
      </div>
    </div>
  );
}
