import { getRequestHeader, H3Event } from "h3";

export default function (event: H3Event) {
  const host = getRequestHeader(event, "host");
  if (!host) return null;

  const [tenant] = host.split(".");

  return tenant;
}
