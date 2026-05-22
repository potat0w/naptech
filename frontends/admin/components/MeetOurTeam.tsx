import TeamMemberSocial from "@/components/TeamMemberSocial";
import { teamMembers } from "@/lib/team";
import { containerClass, headingFont, sectionPy } from "@/lib/layout";
import Image from "next/image";

function TeamPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full max-w-md overflow-hidden bg-surface-card lg:max-w-none">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-top"
      />
    </div>
  );
}

function TeamBio({
  id,
  name,
  role,
  bio,
  social,
  align,
  className = "",
}: {
  id: string;
  name: string;
  role: string;
  bio: string;
  social?: (typeof teamMembers)[number]["social"];
  align: "left" | "right";
  className?: string;
}) {
  const textAlign = align === "right" ? "lg:text-right" : "lg:text-left";

  return (
    <div className={`flex flex-col justify-center ${textAlign} ${className}`}>
      <h2
        id={`team-${id}-heading`}
        className="text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem]"
        style={headingFont}
      >
        {name}
      </h2>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {role}
      </p>
      <p className={`mt-6 max-w-lg text-base leading-relaxed text-body ${align === "right" ? "lg:ml-auto" : ""}`}>
        {bio}
      </p>
      <TeamMemberSocial social={social} align={align === "right" ? "end" : "start"} />
    </div>
  );
}

export default function MeetOurTeam() {
  return (
    <div className="bg-white">
      {teamMembers.map((member, index) => {
        const imageFirst = index % 2 === 0;

        return (
          <section
            key={member.id}
            className={`border-t border-neutral-100 ${sectionPy}`}
            aria-labelledby={`team-${member.id}-heading`}
          >
            <div
              className={`${containerClass} grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24`}
            >
              {imageFirst ? (
                <>
                  <TeamPortrait src={member.image} alt={member.imageAlt} />
                  <TeamBio
                    id={member.id}
                    name={member.name}
                    role={member.role}
                    bio={member.bio}
                    social={member.social}
                    align="left"
                  />
                </>
              ) : (
                <>
                  <div className="lg:col-start-2 lg:row-start-1">
                    <TeamPortrait src={member.image} alt={member.imageAlt} />
                  </div>
                  <TeamBio
                    id={member.id}
                    name={member.name}
                    role={member.role}
                    bio={member.bio}
                    social={member.social}
                    align="right"
                    className="lg:col-start-1 lg:row-start-1"
                  />
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
