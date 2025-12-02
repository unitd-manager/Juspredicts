import React, { useEffect, useState } from 'react';
import { api } from "@/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface UserInfo {
  [key: string]: any; // Add index signature
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: number;
    month: number;
    day: number;
  };
  userStatus: string;
  isMaskedEmail: boolean;
}

enum RewardCategoryTypeEnum {
  UNSPECIFIED = "REWARDCATEGORY_TYPE_UNSPECIFIED",
  LOGIN = "REWARDCATEGORY_TYPE_LOGIN",
  PREDICTIONSTREAK = "REWARDCATEGORY_TYPE_PREDICTIONSTREAK",
}

interface RewardMultiplierInfo {
  baseAmt: string;
  multiplier: string;
}

interface RewardInfo {
  categoryType: RewardCategoryTypeEnum;
  lastRewardedAt: string;
  multiplierInfo: RewardMultiplierInfo;
}

interface RewardsInfoResponse {
  rewards: RewardInfo[];
  status: {
    type: string;
    details: any[];
  };
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [rewards, setRewards] = useState<RewardInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => {
      if (prevInfo) {
        return { ...prevInfo, [name]: value };
      }
      return null;
    });
  };

  const handleSave = async () => {
    if (!userInfo) return;
    try {
      setLoading(true);
      // Assuming the API expects the entire userInfo object for update
      await api.post("/user/v1/editinfo", userInfo);
      setIsEditing(false);
      // Optionally refetch user info to ensure consistency
      // fetchUserInfo();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset userInfo to its original state if changes were made before saving
    // fetchUserInfo(); // This would refetch the original data
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await api.post<{ userInfo: UserInfo }>("/user/v1/getinfo");
        setUserInfo(response.userInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchRewards = async () => {
      try {
        const response = await api.post<RewardsInfoResponse>("/user/v1/getrewards");
        setRewards(response.rewards);
      } catch (err) {
        console.error("Failed to fetch rewards:", err);
      }
    };

    fetchUserInfo();
    fetchRewards();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading profile...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
  <div className="min-h-screen bg-[#0d0d0f] text-white">
    <Navbar />

    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Profile Card */}
      <div className="lg:col-span-2">
        <div className="
          bg-[#111216] 
          border border-white/10 
          rounded-3xl 
          p-8 
          shadow-[inset_2px_2px_6px_rgba(255,255,255,0.06),_inset_-2px_-2px_6px_rgba(0,0,0,0.8)]
          backdrop-blur-xl
        ">
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

          {userInfo && (
            <div className="space-y-5">

              <div>
                <Label>First Name</Label>
                <Input 
                  id="firstName"
                  value={userInfo.firstName}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  name="firstName"
                  className="bg-black/20 border-white/10 rounded-xl"
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input 
                  id="lastName"
                  value={userInfo.lastName}
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                  name="lastName"
                  className="bg-black/20 border-white/10 rounded-xl"
                />
              </div>

              <div>
                <Label>Username</Label>
                <Input 
                  id="userName"
                  value={userInfo.username}
                  readOnly={true}
                  className="bg-black/20 border-white/10 rounded-xl"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input 
                  id="email"
                  value={userInfo.email}
                  readOnly={true}
                  className="bg-black/20 border-white/10 rounded-xl"
                />
              </div>

              {isEditing ? (
                <div className="flex gap-3">
                  <Button className="flex-1 rounded-xl">Save</Button>
                  <Button className="flex-1 rounded-xl" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button className="w-full rounded-xl" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}

            </div>
          )}
        </div>
      </div>

      {/* Rewards Card */}
      <div>
        <div className="
          bg-[#111216] 
          border border-white/10 
          rounded-3xl 
          p-8 
          shadow-[inset_2px_2px_6px_rgba(255,255,255,0.06),_inset_-2px_-2px_6px_rgba(0,0,0,0.8)]
          backdrop-blur-xl
        ">
          <h2 className="text-2xl font-semibold mb-6">Rewards</h2>

          {rewards.length > 0 ? (
            rewards.map((reward, index) => (
              <div 
                key={index}
                className="rounded-xl p-4 border border-white/5 bg-black/10 mb-4 shadow-inner"
              >
                <p><span className="font-semibold">Category:</span> {reward.categoryType}</p>
                <p><span className="font-semibold">Last Rewarded At:</span> {new Date(parseInt(reward.lastRewardedAt)).toLocaleString()}</p>
                <p><span className="font-semibold">Base Amount:</span> {reward.multiplierInfo.baseAmt}</p>
                <p><span className="font-semibold">Multiplier:</span> {reward.multiplierInfo.multiplier}</p>
              </div>
            ))
          ) : (
            <p>No rewards available.</p>
          )}

        </div>
      </div>

    </div>
  </div>
);

};

export default Profile;
