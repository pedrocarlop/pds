import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount
} from "pds";

export function AvatarsSection() {
  return (
    <section className="examples-section" aria-labelledby="avatars-title">
      <div className="examples-section-heading">
        <h2 id="avatars-title">Avatar</h2>
        <p>
          Fallback, sizes, status badge, grouped avatars, and overflow count.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Fallback states</h3>
          <div className="examples-row">
            <Avatar>
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>Long fallback label</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Sizes and status</h3>
          <div className="examples-row">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback>MD</AvatarFallback>
              <AvatarBadge aria-label="Online" />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
              <AvatarBadge aria-label="Active" />
            </Avatar>
          </div>
        </div>

        <div className="examples-panel examples-panel-wide">
          <h3>Group and overflow count</h3>
          <AvatarGroup aria-label="Reviewers">
            <Avatar>
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </section>
  );
}
