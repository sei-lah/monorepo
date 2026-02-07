import { createFileRoute } from "@tanstack/react-router";
import { Atributos } from "#components/atributos";
import { Details } from "#components/details";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Details />
      <Atributos />
    </>
  );
}
