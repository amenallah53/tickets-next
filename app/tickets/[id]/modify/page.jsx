import ModifyForm from '../modify/form'

export default async function ModifyTicket({ params }) {
  const { id } = await params;
  return (
    <main>
      <h2 className="text-primary text-center">Modify ticket</h2>
      <ModifyForm id={id} />
    </main>
  );
}

