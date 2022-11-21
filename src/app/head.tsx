import { STRING_CONSTANTS } from "@/constants/stringConstants";

export default function Head() {
  return (
    <>
      <title>{STRING_CONSTANTS.TITLE}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta
        name="description"
        content={STRING_CONSTANTS.DEFAULT_META_DESCRIPTION}
      />
    </>
  );
}
