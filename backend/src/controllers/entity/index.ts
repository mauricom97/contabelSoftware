const index = async (req: any, res: any) => {
  try {
    const data = await req.prisma.Entity.findMany({
      orderBy: {
        sampleName: "asc",
      },
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default index;
