import ClientWhoAmIPage from "./clientWhoAmIPage";
import WhoAmI from "./whoAmI";

export default async function WhoAmIPage() {
  return (
    <ClientWhoAmIPage id={1}>
      <WhoAmI />
    </ClientWhoAmIPage>
  );
}
