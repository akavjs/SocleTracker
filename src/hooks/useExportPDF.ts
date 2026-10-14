export function useExportPDF() {
  const exportToPDF = (title: string = 'Relivio-Export') => {
    // Créer un style pour l'impression
    const printStyles = `
      <style>
        @media print {
          /* Masquer les éléments non nécessaires */
          .sidebar, 
          .header, 
          .no-print,
          button:not(.print-keep) {
            display: none !important;
          }
          
          /* Ajuster le contenu principal */
          main {
            margin: 0 !important;
            padding: 20px !important;
            width: 100% !important;
          }
          
          /* Optimiser pour l'impression */
          body {
            background: white !important;
            color: black !important;
          }
          
          /* Éviter les sauts de page dans les cartes */
          .card, 
          [style*="background: white"] {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          /* Ajouter des bordures pour la lisibilité */
          table {
            border-collapse: collapse;
            width: 100%;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          /* En-tête de page */
          @page {
            margin: 2cm;
            @top-center {
              content: "${title}";
            }
            @bottom-right {
              content: "Page " counter(page) " sur " counter(pages);
            }
          }
        }
      </style>
    `;

    // Ajouter les styles temporairement
    const styleSheet = document.createElement('div');
    styleSheet.innerHTML = printStyles;
    document.body.appendChild(styleSheet);

    // Lancer l'impression
    window.print();

    // Nettoyer après l'impression
    setTimeout(() => {
      document.body.removeChild(styleSheet);
    }, 1000);
  };

  return { exportToPDF };
}
