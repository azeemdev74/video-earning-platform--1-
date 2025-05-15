import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/utils/firebaseConfig";
import { doc, getDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Referrals = () => {
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const id = user.uid;
        setUserId(id);
        const link = `${window.location.origin}/signup?ref=${id}`;
        setReferralLink(link);

        const userDocRef = doc(db, "users", id);

        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setReferralCount(data.referralCount || 0);
            setReferralEarnings(data.referralEarnings || 0);
          }
        });

        return () => unsubDoc();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Referral link copied!",
        description: "You can now share it with friends.",
      });
    } catch (error) {
      console.error("Copy failed", error);
      toast({
        title: "Error copying link",
        description: "Please try manually.",
      });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Refer & Earn</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Referral Link</label>
        <div className="flex gap-2">
          <Input value={referralLink} readOnly />
          <Button onClick={handleCopyLink}>Copy</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 border rounded-lg shadow">
          <p className="text-lg font-semibold">{referralCount}</p>
          <p className="text-sm text-muted-foreground">Referrals</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <p className="text-lg font-semibold">
            ${referralEarnings.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
