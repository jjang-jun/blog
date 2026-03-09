import { getTimeStamps, TimeStamp as TimeStampType } from '@/lib/about'

export default async function TimeStamp() {
  const timestamps = await getTimeStamps()

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full p-2 pt-2">
        {timestamps.map((timestamp, index) => (
          <div
            className="flex py-2 px-2 pb-8 justify-items-center w-full mr-2 text-md font-semibold border-l-2 border-l-text-sky-400 before:relative before:left-[-9px] before:content-[''] before:self-center before:w-[10px] before:h-[10px] before:bg-text-sky-400 before:rounded-md before:-translate-x-1/2 before:border-2"
            key={timestamp.date}
          >
            <div className="mx-2 w-[115px] min-w-[115px] self-center text-sky-400">
              {timestamp.date}
            </div>

            <div className="flex flex-col justify-center">
              <span>{timestamp.activity}</span>

              <ul>
                {timestamp.detail.map(({ title }) => (
                  <li key={title}>- {title}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
