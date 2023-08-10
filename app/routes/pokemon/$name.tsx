import { useLoaderData, Link } from "remix";
import { useMemo } from "react";
import type { LoaderFunction, MetaFunction } from "remix";

export let handle = {
  title: (params: { name: string }) => params.name,
  breadcrumb: (params: { name: string }) => (
    <Link
      to={`/pokemon/${params.name}`}
      className="text-sm font-medium text-gray-400 hover:text-gray-200">
      {params.name}
    </Link>
  ),
};

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  const data = await response.json();
  return data;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data ? data.name : "Oops...",
  };
};

export default () => {
  const data = useLoaderData<Pokemon>();

  const attributes = useMemo(
    () => ({
      HP: data.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "hp"
      ).base_stat,
      Attack: data.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "attack"
      ).base_stat,
      Defense: data.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "defense"
      ).base_stat,
      Speed: data.stats.find(
        (stat: { stat: { name: string } }) => stat.stat.name === "speed"
      ).base_stat,
      "Special Attack": data.stats.find(
        (stat: { stat: { name: string } }) =>
          stat.stat.name === "special-attack"
      ).base_stat,
      "Special Defense": data.stats.find(
        (stat: { stat: { name: string } }) =>
          stat.stat.name === "special-defense"
      ).base_stat,
    }),
    [data.stats]
  );

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="hover:scale-105 transition duration-200 group block w-full aspect-w-10 aspect-h-8 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
          alt=""
          className="object-cover pointer-events-none group-hover:opacity-75"
        />
      </div>
      <div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attribute
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(attributes).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
