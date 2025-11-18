import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

const Component = () => {
    return (
        <div className='bg-background h-screen w-screen flex justify-center items-center'>
            <VaporizeTextCycle
                texts={["BLITZ", "Innovation", "Experience"]}
                font={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "70px",
                    fontWeight: 600
                }}
                color="rgb(255,255, 255)"
                spread={5}
                density={5}
                animation={{
                    vaporizeDuration: 2,
                    fadeInDuration: 1,
                    waitDuration: 0.5
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H1}
                />
        </div>
    )
}

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-background">
      <Component />
    </div>
  );
};

export { DemoOne, Component };
