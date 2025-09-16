import ReadFloatingMenu from "@/components/ReadFloatingMenu";
import React from "react";

const Read = () => {
  const getPercentage = (totalPages: number, actualPage: number) => {
    return (actualPage / totalPages) * 100;
  };

  return (
    <>
      <ReadFloatingMenu />
      <div className="flex flex-row mx-16 my-16 gap-4 h-full">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex flex-row justify-between px-4">
            <p>Page 145</p>
            <p>{getPercentage(1000, 154)}%</p>
          </div>
          <div className="p-8 bg-amber-100 h-full rounded-2xl font-inria-sherif">
            In medias res is a Latin phrase that means “in the middle of
            things;” in literature, it usually refers to starting a book,
            chapter, or scene in the middle of the narrative, without any
            preamble or backstory. This stands in contrast to starting ab ovo,
            or “from the egg” — both terms having originated from the Roman poet
            Horace, describing different methods of beginning an epic poem. In
            any case, rather than info-dumping in your first chapter, starting
            your book in medias res is an excellent way to instantly hook your
            reader. There are many ways to start in the middle of a story, and
            you could argue that most stories do this to some extent. (After
            all, what is the true origin of any event? The main character’s
            birth? The birth of their parents?) The point is that you throw
            readers right into the thick of it, whether that means a character
            running from an unknown threat or starting your story after a
            funeral. This creates a sense of immediacy and great narrative
            tension, as it raises questions that the reader will only be able to
            answer by reading on. One of my all-time favorite opening chapters
            does exactly this. Javier Marías’ A Heart So White — a sort of
            literary thriller — opens up with a bathroom scene in which a young
            woman, recently returned from her honeymoon, aims a gun at her chest
            and pulls the trigger. She is at a dinner party and, at the sound of
            the gun firing, everything comes to a standstill. When movement
            finally resumes and guests make their way to the bathroom, the
            father of the deceased still has a bite of steak in his mouth,
            unsure of what to do with it. This grotesque imagery not only evokes
            the horror of the scene, but cements just how “in the middle of
            things” we really are. As a reader, you can’t help but wonder at the
            characters’ behavior and ask yourself what events have led to this
            point, as well as what will happen next. This is a perfect example
            of how to start your book by hooking readers in, then slowly zoom
            out to fill in the backstory. Many mysteries and thrillers in
            particular start this way, precisely because it throws the reader
            right into the action while effectively setting up the intrigue of
            the story. From the reader’s perspective, they don’t have to wait
            for the story to get going — and as an author, all you have to do
            from there is keep readers on the line by feeding them the answers
            slowly but surely. When done right, in medias res is an almost
            foolproof way of getting your readers invested from the get-go!
          </div>
        </div>
      </div>
    </>
  );
};

export default Read;
