import Image from "next/image";
import axios from "axios";
const tippy = async ({ amount, name, uid }) => {
  const { data } = await axios.post(
    "https://asia-east2-mnt-alert.cloudfunctions.net/user/quick_qpay",
    {
      data: {
        amount,
        name,
        message: "",
        uid,
      },
    }
  );
  return data;
};
export default async function Botrix({ params, searchParams }) {
  const amount = searchParams.amount;
  const name = searchParams.name;
  const channel = searchParams.channel;
  const { streamer } = await params;
  const { data } = await tippy({ name, amount, uid: streamer });
  console.log(data);
  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <div className="bg-[#171c1e] flex h-full w-full flex-col gap-3 p-4 sm:h-fit sm:w-[408px] sm:rounded">
        <div className="flex flex-row items-center gap-3">
          <div className="flex shrink grow flex-col items-center">
            <Image
              width={280}
              height={280}
              alt="Qr image"
              className="rounded"
              src={`data:image/jpeg;base64,${data.qr_image}`}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="text-text-secondary text-xs">
            A {amount} donation is a great way to help {channel} keep doing what
            they are doing {name}.
          </p>
        </div>
        <div className="bg-[#232628]  h-0.5  grow-0"></div>

        <div className="grid grid-cols-8 gap-2 relative">
          <span className="col-span-8 w-fit text-sm font-semibold">
            Төлбөр төлөх банк аа сонгоно уу
          </span>
          {data.urls.map((url, index) => (
            <a href={url.link}>
              <Image
                width={48}
                height={48}
                className="rounded-xl"
                src={url.logo}
                alt={url.name}
                key={index}
              ></Image>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
