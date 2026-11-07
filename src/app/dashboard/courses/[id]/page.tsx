import CoursePlayer from "@/components/dashboard/CoursePlayer";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CoursePlayer id={id} />;
}
