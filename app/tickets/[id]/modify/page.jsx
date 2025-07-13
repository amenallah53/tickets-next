import ModifyForm from '../modify/form'

export default function ModifyTicket({ params }) {
  return (
    <main>
      <h2 className="text-primary text-center">Modify ticket</h2>
      <ModifyForm id={params.id} />
    </main>
  )
}
