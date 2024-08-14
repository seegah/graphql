import React from "react";
import { useGlobalContext } from "../context/globalState";
import dynamic from "next/dynamic";

// Chargement dynamique du composant ChartCard pour éviter les problèmes de SSR avec ApexCharts
const ChartCard = dynamic(() => import("./ChartCard"), { ssr: false });

const AuditInteraction = () => {
  const { AuditInteractions, loading } = useGlobalContext();

  if (loading) return <div>Loading...</div>;
  if (!AuditInteractions || !Array.isArray(AuditInteractions))
    return <div>No data available</div>;

  const getAuditorInteractions = (data) => {
    let interactionsAuditors = {};

    data.forEach((audit) => {
      if (Array.isArray(audit.groups)) {
        audit.groups.forEach((group) => {
          const myGroups = Array.isArray(group.MyGroups)
            ? group.MyGroups
            : [group.MyGroups];
          myGroups.forEach((myGroup) => {
            const myAuditors = Array.isArray(myGroup.MyAuditors)
              ? myGroup.MyAuditors
              : [myGroup.MyAuditors];
            myAuditors.forEach((auditor) => {
              let login = auditor?.auditor?.login || "Unknown";
              interactionsAuditors[login] =
                (interactionsAuditors[login] || 0) +
                (auditor.interactions || 1);
            });
          });
        });
      }
    });
    return interactionsAuditors;
  };

  const MyAuditorsInteractions = getAuditorInteractions(AuditInteractions);

  // Trier les auditeurs par nombre d'interactions et prendre les 6 premiers
  const sortedAuditors = Object.entries(MyAuditorsInteractions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const auditorLogins = sortedAuditors.map(([login]) => login);
  const auditorInteractions = sortedAuditors.map(
    ([, interactions]) => interactions
  );

  if (auditorLogins.length === 0) return <div>No auditor data available</div>;

  // Options du graphique radar avec les données réelles des auditeurs
  const auditorOptions = {
    series: [
      {
        name: "Interactions",
        data: auditorInteractions,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
        toolbar: {
          show: false, // Désactive le menu près du graphique
        },
      },
      xaxis: {
        categories: auditorLogins, // Utiliser les logins des auditeurs comme catégories
        labels: {
          style: {
            colors: "#000",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        tickAmount: 5,
      },
      fill: {
        colors: ["#FF9B05"], // Change la couleur de remplissage de la figure
      },
      stroke: {
        colors: ["#FF9B05"], // Change la couleur de la bordure de la figure
      },
      tooltip: {
        theme: "dark",
      },
      markers: {
        size: 4, // Taille des points
        colors: ["#FF9B05"], // Change la couleur des points
        strokeColors: "#FF9B05", // Change la couleur de la bordure des points
      },
      
    },
  };

  return (
    <div>
      <ChartCard
        title="Auditor Interactions"
        chartData={auditorOptions.series}
        chartOptions={auditorOptions.options}
        type="radar"
      />
    </div>
  );
};

export default AuditInteraction;
