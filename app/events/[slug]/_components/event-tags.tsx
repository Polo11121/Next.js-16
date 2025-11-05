interface EventTagsProps {
  tags: string[];
}

export const EventTags = ({ tags }: EventTagsProps) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);
