import { Button } from "@/components/ui/button";

const GoogleFormRedirect = () => {
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfASujkfeadT0hs4-y44aU2Kop519pf3mCFWRepD6KDF3eD-w/viewform";

  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <Button
      size="lg"
      className="glow-primary animate-glow px-[10px] py-[20px] my-0 mx-auto text-base font-bold text-center"
      onClick={handleOpenForm}
    >
      Open Registration Form
    </Button>
  );
};

export default GoogleFormRedirect;
