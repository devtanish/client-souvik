"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ppplayground } from "./fonts";
import { FuturaCyrillicBook, fonnts_com_Lyon_Italic } from './fonts';

const Drawer = ({ isOpen, onClose, Data }: { isOpen: boolean; onClose: () => void; Data: any }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 w-[100%] lg:w-[90%] right-0 rounded-none xl:rounded-t-2xl xl:rounded-r-none h-full bg-white shadow-2xl transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Scrollable content wrapper */}
        <div className="h-full overflow-y-auto">
          {/* Image container */}
          <div className="relative w-full h-[32vh] xs:h-[40vh] md:h-[60vh] lg:h-[90vh] overflow-hidden rounded-none rounded-b-2xl xl:rounded-t-2xl xl:rounded-r-none group cursor-pointer flex-shrink-0">
            <Image
              src={Data.url}
              alt={Data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 87vw, 87vw"
              className="object-cover"
              quality={85}
              priority={false}
            />
          </div>

          {/* Content area - Add your additional content here */}
          <div className="md:p-6 flex gap-5 flex-col justify-center items-center w-full">
            <span className=' sticky top-5/12 self-start z-10 hidden md:block'>
              <div className=' scale-120 border-1 mb-5 px-5  lg:px-6 xl:px-8 py-4 rounded-4xl hover:border-black bg-white transition-colors duration-200 '>
                <svg width="14" height="20" className='translate-x-0.5' viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1V10.5M7 1L3 4.5M7 1L11 4.5M4.5625 8H0.5V19H13.5V8H9.4375" stroke="black"></path></svg>
              </div>
              <div className=' scale-120 border-1 px-5 lg:px-6 xl:px-8 py-4 rounded-4xl bg-white hover:border-black transition-colors duration-200'>
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9851 4.72677C15.9157 4.00513 15.5767 3.32585 15.1144 2.76344C14.3205 1.79857 13.0251 1.01557 11.7407 1.00024C10.4342 0.984897 9.2186 1.71896 8.49926 2.77585C7.77992 1.71896 6.56428 0.984897 5.2578 1.00024C3.97347 1.01557 2.67807 1.79857 1.88414 2.76344C1.42107 3.32585 1.08282 4.00513 1.01339 4.72677C0.927723 5.62224 1.26154 6.51772 1.77114 7.26274C2.47202 8.28749 3.47865 9.03397 4.35382 9.8995C5.73563 11.2661 7.11745 12.6327 8.5 14C9.88181 12.6334 11.2636 11.2668 12.6462 9.8995C13.5214 9.03397 14.528 8.28749 15.2289 7.26274C15.7385 6.51772 16.0723 5.62224 15.9866 4.72677H15.9851Z" stroke="black" stroke-miterlimit="10"></path></svg>
              </div>
            </span>


            <div className=' p-6 xl:px-[8%] 2xl:px-[10%] flex gap-0 flex-col justify-center items-center w-full md:-translate-y-40'>
                {/* Tags */}
                <div className="flex uppercase text-sm gap-1 text-black font-semibold hover:text-black">
                    <Link href={`/blog?tag=${Data.tags[0]}`} className="border-1 px-4 py-1 rounded-2xl cursor-pointer">{Data.tags && Data.tags[0]}</Link>
                    <Link href={`/blog?tag=${Data.tags[1]}`} className="px-4 py-1 rounded-2xl cursor-pointer">{Data.tags && Data.tags[1]}</Link>
                </div>

                {/*Title*/}
                <div className='my-5 mt-8 lg:my-10 justify-center flex flex-col lg:px-[6%]'>
                  <div className={`text-center leading-none font-light text-[3rem] md:text-[5rem] xl:text-[6.5rem]  ${ppplayground.className}`}><span>{Data.title}: </span></div>
                  <span className={`text-center -translate-y-2 leading-none font-light text-[2rem] md:text-[3rem] xl:text-[5rem] `}>{Data.description}</span>
                  <div
                    className={` hidden cursor-pointe mt-5 md:flex justify-center gap-x-5  text-center uppercase md:text-xs font-semibold ${FuturaCyrillicBook.className}`}
                  >
                    {Data.publishDate} <span>•</span> {Data.by} <span>•</span> {Data.readTime} 

                  </div>

                </div>

                <div className={`${fonnts_com_Lyon_Italic.className} lg:px-[10%] flex justify-center text-lg md:text-xl text-center xl:text-2xl 2xl:text-3xl md:text-left`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores aut iure impedit dolorem consequatur explicabo vel error cupiditate, numquam aliquam odio nemo quasi? Iste quas, temporibus nemo corrupti iure, enim quisquam ea saepe exercitationem veniam deleniti. Magni aut aspernatur maiores inventore magnam alias provident officiis maxime fugiat aliquid! Laborum quidem, sunt animi adipisci, blanditiis magni repellat veniam quae laudantium itaque nihil porro deleniti dolorem excepturi, obcaecati quod eius alias nulla cum enim quam non cupiditate. Dolore at fugit quidem? Quia facere possimus quasi modi rem, ex ut natus magni dignissimos libero at dicta corrupti porro earum aspernatur. Suscipit facilis soluta, blanditiis error unde magni nam hic nobis laboriosam cum dolorum amet dolor repellendus? Voluptatum facilis quo porro inventore molestiae sunt voluptates quis sint illum velit voluptate autem cum temporibus similique repellendus nemo quisquam, quidem commodi illo nesciunt maiores! Ut tempora nisi nesciunt culpa ad fugiat provident sapiente amet porro nostrum, consequuntur eum fuga animi, quos obcaecati qui aspernatur quas, quis dolorum! Adipisci impedit, perferendis aliquam doloribus illum corporis quam officiis quidem laudantium tempora, necessitatibus ipsa eaque, autem nobis explicabo voluptatibus iusto id esse quis exercitationem dignissimos maxime molestias iste cumque. Expedita odit at voluptate, cum quidem, pariatur molestiae laboriosam illo quibusdam, maiores explicabo commodi unde aspernatur blanditiis. Nobis omnis distinctio consequatur, amet repellendus corporis eveniet molestias, tempore rerum rem modi veniam quidem facere necessitatibus possimus quisquam voluptatum laborum asperiores! Labore, ipsum deserunt mollitia accusamus totam quaerat eveniet ab perferendis velit quo sapiente corrupti eius optio, dolorem id odit iste non nulla quas inventore, officia provident dignissimos! Voluptates aliquid repudiandae iste et quisquam quod? Quas earum eligendi tempore quod officiis non labore aut dignissimos eveniet, corporis blanditiis maxime ratione dolorem magnam iste ad eaque neque nam quasi. Veritatis nam natus totam eaque id laborum nostrum itaque distinctio. In amet sed, aut ut ipsum accusamus. Perspiciatis similique explicabo aut atque, vitae error quod quaerat modi aliquam dolores, aperiam esse vero voluptates deleniti sequi optio at beatae temporibus facere, placeat hic. Iure aut debitis accusantium quia impedit ipsum, deleniti rerum fugit mollitia. Veniam blanditiis reiciendis totam eos, ad tempora quos temporibus dicta nobis fugit quae repellendus, cum iusto minus omnis? Provident ducimus debitis eaque! Eveniet veniam quae omnis consequuntur doloribus. Beatae voluptatem amet dolore eius tempora. Recusandae, perspiciatis odio est labore ut repellendus optio? At, quas. Explicabo, nam porro? Rem nesciunt, deleniti laboriosam dolores minus, veritatis aliquam doloribus minima sequi molestiae quidem odio, eos eligendi incidunt vel iste saepe nulla est! Consectetur asperiores aliquid soluta facere delectus sequi debitis neque necessitatibus rerum explicabo tenetur optio quisquam, velit tempore? Quod exercitationem, error quibusdam architecto laborum ullam. Dolorum consequatur nesciunt incidunt velit deleniti expedita, commodi qui saepe, fuga obcaecati porro, fugiat impedit! Quod, dolore temporibus libero ducimus corporis soluta hic quo nesciunt perspiciatis adipisci consectetur similique velit corrupti placeat voluptate eos labore. Quasi voluptatibus reiciendis, similique quidem laborum odio et, illum vel expedita vitae corporis enim deserunt rem natus laudantium cupiditate! Natus et molestias laudantium repellendus ut aut, facere, voluptate eum, autem accusantium nihil aliquid omnis? Illo officia quasi aut natus vel voluptatem ut, porro eum. Dolorem incidunt ea at explicabo quasi, deleniti harum totam rerum enim maiores aperiam? Natus eligendi quasi, odit corporis repellat, qui, laboriosam repellendus harum repudiandae est esse. Quod voluptates qui laboriosam ipsa accusantium sint aut, tempora esse dolores rem eum odio, totam possimus molestiae eligendi ipsam. Illo ad libero deleniti. Consectetur dignissimos repellat eligendi odit, rerum modi odio dolores fuga reiciendis beatae non necessitatibus illum, tempore debitis. Recusandae perferendis reprehenderit aliquam quo iusto eos enim repellat fuga ipsum facilis. Aliquam, laudantium. Eaque distinctio dolores aliquam maiores soluta repellendus delectus labore corporis ab, voluptatum a libero culpa inventore id saepe commodi, ex odio nam dolor fuga alias, animi sint quis. Dolorum aspernatur alias iure et unde officiis facere beatae explicabo quidem, illo eveniet totam ea fuga asperiores, illum dignissimos. Quas nihil aspernatur veniam libero! Eligendi saepe voluptate commodi aliquid suscipit, minus exercitationem maiores in at! Pariatur tempora omnis doloremque facere, voluptatum nam nisi quas id, nostrum vel nihil numquam libero laboriosam labore accusantium fugit dicta ducimus iste corporis reiciendis quaerat dolorem perferendis? Dolore itaque quisquam magnam, nulla repellendus iure exercitationem ratione! Eos quam libero quos molestias saepe, iusto aut provident debitis eius ea necessitatibus! Soluta aut tenetur ipsum laudantium iste saepe voluptatem maiores commodi deserunt enim itaque provident ea quisquam repudiandae ipsam rem minus, quos debitis molestias quis quae pariatur. Sapiente quis, tempora provident ducimus a repellat eaque ea rerum, tenetur aliquam aperiam accusamus non debitis repudiandae eum, magni voluptatibus labore facere! Quod dolor nisi, temporibus atque distinctio veniam ex qui expedita itaque earum magni impedit minima numquam vitae. Eveniet non laboriosam aliquid similique accusantium voluptatem praesentium facilis tempora libero. Dolorem similique recusandae obcaecati quidem provident nisi sed, eligendi ipsam corrupti molestias vel nobis exercitationem est, unde sint praesentium tenetur accusamus modi ipsum eius quas voluptates quisquam quae veritatis? Suscipit, sit veritatis? Modi nobis sapiente pariatur, dolor eum saepe, temporibus quis deleniti necessitatibus laudantium amet inventore unde sequi placeat culpa voluptatem! Dolorem, nisi doloribus vero molestias repudiandae id quibusdam voluptatibus libero quis, adipisci rerum earum nostrum hic, amet soluta provident sed officiis facere et. Quis repudiandae error odio dolorum ex deserunt, quidem illum sunt provident aliquam unde facilis eveniet temporibus ratione, possimus officia architecto quod nihil impedit, dolor commodi velit optio. Non dignissimos cum doloremque quod saepe, dicta beatae quos praesentium deserunt consequatur. Quod fugiat at commodi quia dignissimos quas ab, quos et provident non. Natus optio amet, animi possimus autem labore dicta adipisci ullam dolorum sint quas illo doloribus. Cumque illo, laborum enim minima quis libero quaerat ipsam autem hic fuga rerum natus vitae tenetur vel quam commodi, iste animi sit! Voluptate ad distinctio repellat non quidem, voluptatibus quis necessitatibus ipsa assumenda optio similique itaque labore, architecto omnis repellendus molestiae cum alias eveniet earum reiciendis. Voluptas eligendi amet id ipsa illo et aperiam totam maiores doloremque perferendis vero deserunt dolores, architecto nisi quidem eius quod animi? Unde expedita quod distinctio dolorem iste impedit quibusdam quos vel ducimus eos minus itaque quis sequi, exercitationem facere optio beatae officiis vitae voluptatem, quaerat officia facilis ratione nisi earum! Voluptatem corrupti nemo earum ex voluptate, suscipit, eligendi ad in numquam corporis similique repellat ea nihil, reiciendis ratione itaque nesciunt? Dolore, accusamus veritatis. Minus at, illum assumenda placeat cumque quidem non ipsum deleniti architecto incidunt voluptate necessitatibus quos et vitae perspiciatis expedita, similique, itaque aut nobis dicta eaque porro? Laborum aut corrupti asperiores quas laudantium, sint consequatur, fugit blanditiis, architecto reiciendis repellat nemo velit! Aspernatur quae magnam rerum veniam reiciendis, voluptas, velit tempore minus corrupti ea qui. Earum architecto iure delectus dolorem eum consequuntur, dolorum quos excepturi ducimus nisi blanditiis voluptatum, fuga saepe iste rerum iusto ipsam. Enim explicabo modi, obcaecati architecto iste quia recusandae praesentium quas quam dolor at, sunt veritatis quidem repudiandae blanditiis minima dolores autem possimus nam id! Quos autem neque nostrum dolor, similique numquam ex commodi iusto assumenda vel illum adipisci, placeat ipsa doloribus necessitatibus, voluptatum impedit dolorum. Dicta aliquid, pariatur consequatur, eius mollitia magnam dignissimos quam animi, aut ratione unde doloribus aliquam. Vitae, exercitationem! Quae fugiat quod, porro nisi necessitatibus suscipit neque dolores qui aut sunt facere voluptatibus voluptas, error rem alias, officiis obcaecati odit voluptatum totam dicta natus. Nobis eligendi expedita placeat atque, vel reprehenderit quae dolorem officiis quisquam. Aspernatur, suscipit explicabo numquam qui dolores itaque molestias nobis placeat cupiditate quos veritatis necessitatibus similique a voluptas odit soluta consequuntur. Molestias quisquam nisi itaque harum accusamus repudiandae. Ipsum expedita laborum cupiditate, animi ut architecto aliquid quo numquam in voluptate porro molestiae eaque, ipsam dolores dolorum officia sed aspernatur libero? Ullam dicta sint tenetur ducimus hic distinctio veniam dolores, officia non, eum pariatur repellat odit eius facilis suscipit quidem aut sequi ut neque rem obcaecati ea. Ab ut eius laborum, labore fugiat omnis, quis, delectus veritatis exercitationem impedit illum non doloribus consequatur unde voluptates a beatae vero! Libero, error? A eaque similique voluptatibus, illo ratione repudiandae laudantium doloremque aliquam dolorem culpa nemo necessitatibus inventore facilis consectetur, cumque, voluptas nihil adipisci vero! Atque eius ducimus fuga dignissimos fugiat! Rerum vel optio inventore iusto provident quia nostrum facere natus adipisci velit, dignissimos minima animi earum recusandae mollitia unde eum nisi consequatur molestias non consectetur ab a maiores? Minima repellat sed itaque fuga corrupti laborum eligendi eos, doloribus quaerat odio quia modi ea voluptatum atque tempore, ullam aut incidunt aspernatur. Esse voluptatum iusto blanditiis magni excepturi alias maxime voluptas architecto aut, autem necessitatibus totam provident numquam omnis officia id quaerat quod dolor voluptates voluptatibus harum incidunt error. Consectetur quos esse ex voluptate quia! Molestias tempore odit fugiat minima necessitatibus ad magnam? Error maiores illo labore nemo aliquam possimus, iusto a, asperiores laborum officia nam velit suscipit voluptatem sint aut beatae quod. Itaque illo consequatur voluptatum accusamus quis facere omnis unde quisquam numquam eaque repellat temporibus quaerat hic possimus asperiores optio inventore eos nulla laborum totam reprehenderit sapiente animi, excepturi quam. Magni tenetur asperiores debitis, nulla reprehenderit quis tempora vel hic dolore ipsum assumenda distinctio soluta similique voluptatem dolorem. Impedit et incidunt libero nam.</div>
              </div>
            </div>
        </div>

        {/* Close button (optional but recommended) */}
        <button
          onClick={onClose}
          className="absolute transition-colors top-4 md:top-8 left-5 sm:left-10 lg:-left-17 xl:-left-20 scale-100 lg:scale-120 z-10 bg-transparent lg:ring-white ring-gray-500 ring-[0.05rem] hover:ring-gray-400 rounded-full p-2 "
          aria-label="Close drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 lg:text-white"
            fill=""
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Drawer;