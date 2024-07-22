import Steps from "@/components/Steps";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
