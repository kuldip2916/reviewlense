export default function AreReviewsFakePost() {
  return (
    <article
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '0 20px',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.8,
        color: '#f1f5f9',
      }}
    >
      {/* Hero Section */}
      <section style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 16,
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          Are Online Reviews Fake? How to Tell in Seconds
        </h1>
        <p
          style={{
            fontSize: 18,
            color: '#94a3b8',
            marginBottom: 0,
          }}
        >
          Nearly 40% of online reviews are estimated to be fake. Here's how to protect yourself before you buy.
        </p>
      </section>

      {/* Opening Stats */}
      <section style={{ marginBottom: 48 }}>
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderLeft: '4px solid #6366f1',
            padding: 24,
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <p style={{ marginBottom: 0, fontSize: 16, color: '#e2e8f0' }}>
            <strong>The numbers are shocking:</strong> Between 30-40% of online reviews on platforms like
            Amazon, Walmart, and eBay are estimated to be fake or manipulated. The FTC cracked down hard in
            2023-2024, but the problem only got more sophisticated.
          </p>
        </div>
        <p style={{ marginBottom: 0 }}>
          The bad news: You can't trust the star rating alone. The good news: There are proven ways to spot
          fakes - and most of them take less than 30 seconds.
        </p>
      </section>

      {/* How Fake Reviews Actually Work */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 16,
            color: '#ffffff',
            borderLeft: '4px solid #6366f1',
            paddingLeft: 16,
          }}
        >
          How Fake Reviews Actually Work
        </h2>
        <p style={{ marginBottom: 16 }}>
          Fake reviews aren't always obvious. The tactics have evolved:
        </p>
        <ul
          style={{
            marginBottom: 24,
            paddingLeft: 24,
            listStyle: 'disc',
          }}
        >
          <li style={{ marginBottom: 12 }}>
            <strong>Review farms and services:</strong> Companies pay third-party services to post fake
            reviews. This costs sellers $0.50-$3 per review.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>Incentivized reviews:</strong> Sellers offer discounts or freebies in exchange for
            positive reviews (technically illegal, widely done).
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>Bulk purchasing:</strong> Sellers buy their own products in bulk, leave fake reviews, then
            request refunds. The reviews stay, the money comes back.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>Review account networks:</strong> Fake accounts that review dozens of random products to
            look legitimate, then suddenly pivot to posting on one seller's items.
          </li>
          <li style={{ marginBottom: 0 }}>
            <strong>Competitor sabotage:</strong> Rivals post 1-star reviews to tank ratings. Less common than
            fake 5-stars, but it happens.
          </li>
        </ul>
      </section>

      {/* Quick Checks */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 16,
            color: '#ffffff',
            borderLeft: '4px solid #6366f1',
            paddingLeft: 16,
          }}
        >
          5 Quick Checks You Can Do in Seconds
        </h2>

        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
              color: '#e2e8f0',
            }}
          >
            1. Look at the Rating Distribution
          </h3>
          <p style={{ marginBottom: 0 }}>
            Scroll to the rating breakdown graph. Real products show a natural curve: most 4-5 stars, fewer
            3-stars, even fewer 1-2 stars. If 85%+ are 5-stars with almost nothing in between? Suspicious.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
              color: '#e2e8f0',
            }}
          >
            2. Check the Review Timeline
          </h3>
          <p style={{ marginBottom: 0 }}>
            Click "See all reviews" and sort by "Most recent." Do all the reviews come in clusters (10 on
            Tuesday, 15 on Wednesday, none for a week)? Real products get reviews spread over weeks and
            months.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
              color: '#e2e8f0',
            }}
          >
            3. Read the 3-Star Reviews First
          </h3>
          <p style={{ marginBottom: 0 }}>
            Ignore the 5-stars for now. Go straight to 3-star reviews - these are where real users mention
            actual issues. If the 3-stars are also generic ("Great product!"), that's a red flag. Real
            criticism appears in middle ratings.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
              color: '#e2e8f0',
            }}
          >
            4. Check Reviewer Profiles
          </h3>
          <p style={{ marginBottom: 0 }}>
            Click on a top reviewer. Do they have a history of reviews across different products? Or did they
            suddenly post 10 reviews in one day, all 5-stars, all for the same seller? Fake accounts are
            usually obvious once you dig.
          </p>
        </div>

        <div style={{ marginBottom: 0 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
              color: '#e2e8f0',
            }}
          >
            5. Compare with Competitors
          </h3>
          <p style={{ marginBottom: 0 }}>
            Find a competing product from a different seller (same item). If your product has 5,000 reviews
            at 4.8 stars and the competitor has 800 reviews at 4.6 stars, the massive difference is worth
            investigating.
          </p>
        </div>
      </section>

      {/* Why Platform Ratings Alone Aren't Enough */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 16,
            color: '#ffffff',
            borderLeft: '4px solid #6366f1',
            paddingLeft: 16,
          }}
        >
          Why Platform Ratings Alone Aren't Enough
        </h2>
        <p style={{ marginBottom: 16 }}>
          Amazon, Walmart, and eBay have detection systems, but they're not perfect. They:
        </p>
        <ul
          style={{
            marginBottom: 24,
            paddingLeft: 24,
            listStyle: 'disc',
          }}
        >
          <li style={{ marginBottom: 12 }}>
            Lag behind new manipulation tactics (by the time they catch it, the damage is done)
          </li>
          <li style={{ marginBottom: 12 }}>Flag obvious spam but miss sophisticated patterns</li>
          <li style={{ marginBottom: 12 }}>
            Prioritize seller partnerships (removing reviews can hurt seller relationships and platform revenue)
          </li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          You can't rely on the platform alone. You need to do your own spot-checking.
        </p>
      </section>

      {/* The Reddit Trick */}
      <section style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 16,
            color: '#ffffff',
            borderLeft: '4px solid #6366f1',
            paddingLeft: 16,
          }}
        >
          The Reddit Trick (The Best Free Method)
        </h2>
        <p style={{ marginBottom: 16 }}>
          Here's the fastest way to find real user opinions: Search for the product on Reddit.
        </p>
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <p style={{ marginBottom: 8, fontWeight: 600, color: '#e2e8f0' }}>
            Open Google and search: "[Product name] reddit"
          </p>
          <p style={{ marginBottom: 0, fontSize: 14, color: '#cbd5e1' }}>
            You'll find real, unfiltered discussions from people who actually bought the product. Reddit is
            full of passionate reviews because people aren't being paid - they're just sharing their honest
            experience.
          </p>
        </div>
        <p style={{ marginBottom: 12 }}>
          Why this works: Reddit reviews are extremely hard to fake. Accounts that suddenly post fake praise
          get called out by the community. You see real pros, real cons, and real warnings.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Note:</strong> This is what tools like ReviewLens automate. Instead of manually searching
          Reddit, the extension does it for you and shows you the sentiment analysis right on the product page.
        </p>
      </section>

      {/* Practical Advice */}
      <section
        style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderLeft: '4px solid #6366f1',
          padding: 24,
          borderRadius: 8,
          marginBottom: 0,
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 12,
            color: '#ffffff',
          }}
        >
          The Practical Way to Shop Smarter
        </h3>
        <p style={{ marginBottom: 12 }}>
          Before you hit "Buy Now":
        </p>
        <ul
          style={{
            marginBottom: 16,
            paddingLeft: 24,
            listStyle: 'disc',
          }}
        >
          <li style={{ marginBottom: 8 }}>Glance at the rating distribution (should look like a bell curve)</li>
          <li style={{ marginBottom: 8 }}>Check the 3-star reviews for real feedback</li>
          <li style={{ marginBottom: 8 }}>Search the product on Reddit for honest takes</li>
          <li style={{ marginBottom: 8 }}>Compare to competitor versions and their review counts</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          This takes 2-3 minutes and will save you from bad purchases far more often than blindly trusting a
          4.8-star rating.
        </p>
      </section>
    </article>
  );
}
