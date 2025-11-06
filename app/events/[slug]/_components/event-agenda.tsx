interface EventAgendaProps {
  agendaItems: string[];
}

export const EventAgenda = ({ agendaItems }: EventAgendaProps) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
