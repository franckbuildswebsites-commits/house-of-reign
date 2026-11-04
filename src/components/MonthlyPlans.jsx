import Reveal from "./Reveal";
import Press from "./Press";
import SectionHeading from "./SectionHeading";
import { Check, Layout } from "./Icons";
import { monthlyPlans, MONTHLY_NOTE, BUNDLE_NOTE } from "../data/services";

// Two monthly plans after the website plans, built like the Pricing cards. The featured plan uses
// the pill colors (black here, white in dark mode), like the floating nav pills.
export default function MonthlyPlans() {
  return (
    <section id="monthly" aria-labelledby="monthly-title" className="section-y">
      <div className="site-wrap">
        <SectionHeading id="monthly-title" label="Monthly plans" title="Your business, at its best." dim="Every month.">
          A great website gets you found. What keeps customers coming back is showing up looking sharp, week after week. We shoot your content, run your posts, keep your Google profile working, and keep your site current, so you can focus on running the place.
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2">
          {monthlyPlans.map((p, i) => {
            const dark = p.featured;
            const soft = dark ? "text-on-pill/65" : "text-caption";
            return (
              <Reveal key={p.name} delay={i * 50} className="h-full">
                <Press
                  as="div"
                  lift={3}
                  press={0.99}
                  className={`flex h-full flex-col rounded-[24px] border p-6 sm:p-7 ${dark ? "border-pill bg-pill text-on-pill" : "border-line"}`}
                >
                  <h3 className="t-h4">{p.name}</h3>
                  <p className={`mt-1 text-sm ${soft}`}>{p.tagline}</p>
                  <p className="t-h2 mt-6">{p.price}</p>
                  <p className={`mt-0.5 text-sm ${soft}`}>per month</p>
                  <p className="mt-5 text-[0.9375rem] leading-snug">{p.line}</p>
                  <p
                    className={`mt-4 flex items-start gap-2 rounded-[14px] px-3 py-2.5 text-[0.9375rem] font-medium leading-snug ${dark ? "bg-on-pill/10 text-on-pill" : "bg-accent/[0.07] text-accent"}`}
                  >
                    <Layout className="mt-0.5 h-4 w-4 shrink-0" />
                    {p.bundle}
                  </p>
                  <ul className={`mt-5 flex flex-col gap-2 border-t pt-5 text-[0.9375rem] leading-snug ${dark ? "border-on-pill/20" : "border-line"}`}>
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-on-pill" : "text-accent"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <Press
                      href={`/contact?plan=${p.id}`}
                      className={`btn ${dark ? "bg-on-pill text-pill" : "bg-pill text-on-pill"}`}
                    >
                      Get started
                    </Press>
                  </div>
                </Press>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 flex max-w-[40rem] flex-col gap-1.5">
          <p className="t-small !max-w-none">{BUNDLE_NOTE}</p>
          <p className="t-small !max-w-none">{MONTHLY_NOTE}</p>
        </Reveal>
      </div>
    </section>
  );
}
