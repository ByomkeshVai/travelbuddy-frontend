import Image from "next/image";

const TravelTips = () => {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Travel Tips
          </h2>
          <p className="mt-4 text-slate-50">
            Stay connected by having access to maps and communication tools, and
            always pack some snacks for long journeys or delays. Be aware of
            common scams in your destination and stay vigilant. Respect local
            customs and etiquette to enhance your experience and interaction
            with locals. Share your travel plans with someone you trust for
            safety, and ensure you have any necessary medications and
            vaccinations. By following these tips, you can make your travel
            experience more enjoyable and stress-free.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-slate-50 pt-4">
              <dt className="font-medium text-slate-50">Pack Light</dt>
              <dd className="mt-2 text-sm text-slate-50">
                Bring only essentials to avoid excess baggage and make moving
                around easier.
              </dd>
            </div>
            <div className="border-t border-slate-50 pt-4">
              <dt className="font-medium text-slate-50">Material</dt>
              <dd className="mt-2 text-sm text-slate-50">
                Have a small bag with your passport, wallet, phone, and other
                essentials.
              </dd>
            </div>
            <div className="border-t border-slate-50 pt-4">
              <dt className="font-medium text-slate-50">Stay Connected</dt>
              <dd className="mt-2 text-sm text-slate-50">
                6.25&quot; x 3.55&quot; x 1.15&quot;
              </dd>
            </div>
            <div className="border-t border-slate-50 pt-4">
              <dt className="font-medium text-slate-50">Pack Snacks</dt>
              <dd className="mt-2 text-sm text-slate-50">
                Keep some snacks for long journeys or unexpected delays.
              </dd>
            </div>
            <div className="border-t border-slate-50 pt-4">
              <dt className="font-medium text-slate-50">
                Respect Local Customs
              </dt>
              <dd className="mt-2 text-sm text-slate-50">
                Learn about and respect local customs and etiquette.
              </dd>
            </div>
            <div className="border-t border-slate-50 pt-4">
              <dt className="font-medium text-slate-50">Health Precautions</dt>
              <dd className="mt-2 text-sm text-slate-50">
                Carry any necessary medications and check for required
                vaccinations.
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <Image
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-slate-50"
            width={200}
            height={200}
          />
          <Image
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-slate-50"
            width={200}
            height={200}
          />
          <Image
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-slate-50"
            width={200}
            height={200}
          />
          <Image
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-slate-50"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelTips;
