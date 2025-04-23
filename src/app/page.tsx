"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function Home() {
  // State for calculator inputs
  const [requests, setRequests] = useState<number>(100000)
  const [computeTime, setComputeTime] = useState<number>(500)
  const [storageNeeded, setStorageNeeded] = useState<number>(10)
  const [dataTransfer, setDataTransfer] = useState<number>(50)
  const [idleTime, setIdleTime] = useState<number>(60)
  
  // State for calculated costs
  const [serverlessCost, setServerlessCost] = useState<number>(0)
  const [traditionalCost, setTraditionalCost] = useState<number>(0)
  const [savings, setSavings] = useState<number>(0)
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0)

  // Team member information
  const teamMembers = [
    {
      name: "Sufiyaan Usmani",
      rollNumber: "21K-3195",
      image: "/sufiyaan.jpg" // You'll need to add these images to the public folder
    },
    {
      name: "Muhammad Shahmir Raza",
      rollNumber: "21K-3158",
      image: "/shahmir.jpg"
    },
    {
      name: "Talha Shahid",
      rollNumber: "21K-3355",
      image: "/talha.png"
    },
    {
      name: "Qasim Hasan",
      rollNumber: "21K-3210",
      image: "/qasim.jpg"
    }
  ]

  // Calculate costs whenever inputs change
  useEffect(() => {
    // Serverless pricing (simplified model)
    // - Compute: $0.0000002 per ms of execution time
    // - Requests: $0.2 per 1M requests
    // - Storage: $0.023 per GB per month
    // - Data transfer: $0.09 per GB
    const computeCost = (requests * computeTime * 0.0000002)
    const requestCost = (requests / 1000000) * 0.2
    const storageCost = storageNeeded * 0.023
    const transferCost = dataTransfer * 0.09
    
    const totalServerlessCost = computeCost + requestCost + storageCost + transferCost
    setServerlessCost(parseFloat(totalServerlessCost.toFixed(2)))
    
    // Traditional hosting (simplified VM model)
    // - Basic VM: $30 per month
    // - Additional storage: $0.10 per GB per month
    // - Data transfer: $0.12 per GB
    // - Adjust for idle time: servers running even when not in use
    const baseVMCost = 30
    const additionalStorageCost = storageNeeded > 20 ? (storageNeeded - 20) * 0.10 : 0
    const tradTransferCost = dataTransfer * 0.12
    
    // Adjust for idle time - higher idle time means more wastage for traditional hosting
    const utilizationFactor = (100 - ((idleTime / 100) * 80)) / 100
    
    const totalTraditionalCost = (baseVMCost + additionalStorageCost + tradTransferCost) / utilizationFactor
    setTraditionalCost(parseFloat(totalTraditionalCost.toFixed(2)))
    
    // Calculate savings
    const costDifference = totalTraditionalCost - totalServerlessCost
    setSavings(parseFloat(costDifference.toFixed(2)))
    setSavingsPercentage(parseFloat(((costDifference / totalTraditionalCost) * 100).toFixed(1)))
  }, [requests, computeTime, storageNeeded, dataTransfer, idleTime])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Serverless vs Traditional Cloud Calculator</h1>
          <p className="text-muted-foreground">
            Compare costs between serverless computing and traditional cloud hosting
          </p>
        </div>
        
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Cost Comparison</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>Cost Calculator</CardTitle>
                <CardDescription>Adjust parameters to see cost differences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="requests">Monthly Requests</Label>
                      <span className="text-muted-foreground">{requests.toLocaleString()}</span>
                    </div>
                    <Slider 
                      id="requests"
                      min={1000} 
                      max={10000000} 
                      step={1000} 
                      value={[requests]} 
                      onValueChange={(value) => setRequests(value[0])} 
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1K</span>
                      <span>10M</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="compute">Compute Time per Request (ms)</Label>
                      <span className="text-muted-foreground">{computeTime} ms</span>
                    </div>
                    <Slider 
                      id="compute"
                      min={10} 
                      max={5000} 
                      step={10} 
                      value={[computeTime]} 
                      onValueChange={(value) => setComputeTime(value[0])} 
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10ms</span>
                      <span>5,000ms</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="storage">Storage Needed (GB)</Label>
                      <span className="text-muted-foreground">{storageNeeded} GB</span>
                    </div>
                    <Slider 
                      id="storage"
                      min={1} 
                      max={100} 
                      step={1} 
                      value={[storageNeeded]} 
                      onValueChange={(value) => setStorageNeeded(value[0])} 
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1GB</span>
                      <span>100GB</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="data">Monthly Data Transfer (GB)</Label>
                      <span className="text-muted-foreground">{dataTransfer} GB</span>
                    </div>
                    <Slider 
                      id="data"
                      min={1} 
                      max={1000} 
                      step={1} 
                      value={[dataTransfer]} 
                      onValueChange={(value) => setDataTransfer(value[0])} 
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1GB</span>
                      <span>1,000GB</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="idle">Server Idle Time (%)</Label>
                      <span className="text-muted-foreground">{idleTime}%</span>
                    </div>
                    <Slider 
                      id="idle"
                      min={0} 
                      max={95} 
                      step={1} 
                      value={[idleTime]} 
                      onValueChange={(value) => setIdleTime(value[0])} 
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>95%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Serverless Computing</CardTitle>
                  <CardDescription>Pay-per-use model</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">${serverlessCost.toFixed(2)}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compute Costs:</span>
                      <span>${(requests * computeTime * 0.0000002).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Request Costs:</span>
                      <span>${((requests / 1000000) * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Storage Costs:</span>
                      <span>${(storageNeeded * 0.023).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Data Transfer:</span>
                      <span>${(dataTransfer * 0.09).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Traditional Cloud</CardTitle>
                  <CardDescription>Fixed infrastructure costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">${traditionalCost.toFixed(2)}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>VM Costs:</span>
                      <span>$30.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Extra Storage:</span>
                      <span>${(storageNeeded > 20 ? (storageNeeded - 20) * 0.10 : 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Data Transfer:</span>
                      <span>${(dataTransfer * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Idle Time Impact:</span>
                      <span className="text-orange-500">{idleTime}% wasted capacity</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Cost Comparison Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">Monthly Savings with Serverless:</span>
                    <span className={`text-xl font-bold ${savings > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${Math.abs(savings).toFixed(2)} ({savings > 0 ? `${savingsPercentage}% less` : `${Math.abs(savingsPercentage)}% more`})
                    </span>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-neutral-200 dark:bg-neutral-700">
                      <div 
                        style={{ width: `${serverlessCost > traditionalCost ? '100' : (serverlessCost / traditionalCost) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Serverless</span>
                      <span>Traditional</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {savings > 0 ? (
                      <p>Serverless is more cost-effective for your current usage pattern. You benefit from not paying for idle time.</p>
                    ) : (
                      <p>Traditional hosting is more cost-effective for your current usage pattern, likely due to high volume of requests and/or long execution times.</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Note: This is a simplified model. Actual costs may vary based on specific cloud provider pricing, reserved instances, and other factors.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <div className="grid gap-6 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>Roll Number: {member.rollNumber}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden">
                      <Image 
                        src={member.image} 
                        alt={`${member.name}'s photo`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
