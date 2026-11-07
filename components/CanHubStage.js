import Image from 'next/image';

/** CanHub 365 product shot: practice dashboard on desktop with the client portal on a phone. */
export default function CanHubStage({ className = '', priority = false }) {
  return (
    <div className={`th-stage th-stage-image ${className}`} data-reveal data-delay="160">
      <div className="th-tilt" data-tilt>
        <Image
          src="/images/canhub/practice-overview.png"
          alt="CanHub 365 practice overview showing active clients, documents awaited and client workflows, beside the client's document upload screen on a phone."
          width={1602}
          height={852}
          sizes="(max-width: 960px) 100vw, (max-width: 1440px) 720px, (max-width: 2200px) 50vw, 1030px"
          priority={priority}
        />
      </div>
    </div>
  );
}
