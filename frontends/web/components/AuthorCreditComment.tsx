const credit = `<!--
Author: Kahon Binte Zaman
Contact: kahonbintezaman@gmail.com
-->`;

export default function AuthorCreditComment() {
  return (
    <script
      type="text/plain"
      id="site-author-credit"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: credit }}
    />
  );
}
