export const onRequest = async (context, next) => {
  const urlSearchParams = new URLSearchParams(context.url.searchParams);
  const contentOnly = urlSearchParams.get("contentOnly");

  const response = await next();
  const html = await response.text();

  const startToken = "<article";
  const endToken = "</article>";

  const start = html.indexOf(startToken);
  const end = html.indexOf(endToken);
  let article = html.slice(start, end + endToken.length);

  return new Response(contentOnly ? article : html, {
    status: 200,
    headers: response.headers,
  });
};
