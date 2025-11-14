"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Cpu,
  Wrench,
  Wifi,
  Cable,
  Cog,
  Download,
  FileCode,
  HardDrive,
  Layers,
  Zap,
  Camera,
  Gamepad,
  ArrowRight,
  Check,
  Info,
} from "lucide-react"

export default function HardwareIntegrationPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("hardware")

  const handleDownload = (item) => {
    toast({
      title: "Download iniciado",
      description: `O download de ${item} começará em instantes.`,
    })
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Integração de Hardware
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Guia completo para integrar máquinas físicas com a plataforma Plush For You
          </p>
        </div>

        <Tabs defaultValue="hardware" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="hardware">
              <HardDrive className="h-4 w-4 mr-2" />
              Hardware
            </TabsTrigger>
            <TabsTrigger value="software">
              <FileCode className="h-4 w-4 mr-2" />
              Software
            </TabsTrigger>
            <TabsTrigger value="setup">
              <Wrench className="h-4 w-4 mr-2" />
              Montagem
            </TabsTrigger>
            <TabsTrigger value="api">
              <Layers className="h-4 w-4 mr-2" />
              API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hardware" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HardDrive className="h-5 w-5 mr-2" />
                  Lista de Hardware Necessário
                </CardTitle>
                <CardDescription>
                  Componentes necessários para integrar uma máquina física com nossa plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Cpu className="h-4 w-4 mr-2" />
                        Controlador Principal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Raspberry Pi 4</p>
                          <p className="text-sm text-muted-foreground">4GB ou 8GB RAM</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Arduino Mega 2560</p>
                          <p className="text-sm text-muted-foreground">Para controle dos motores</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Fonte de alimentação</p>
                          <p className="text-sm text-muted-foreground">12V/5A</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Cartão microSD</p>
                          <p className="text-sm text-muted-foreground">32GB Classe 10 (mínimo)</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Gamepad className="h-4 w-4 mr-2" />
                        Componentes da Garra
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Motores de passo NEMA 17</p>
                          <p className="text-sm text-muted-foreground">2 unidades</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Servo motor MG996R</p>
                          <p className="text-sm text-muted-foreground">Para controle da garra</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Drivers A4988</p>
                          <p className="text-sm text-muted-foreground">Para motores de passo</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Correia GT2 e polias</p>
                          <p className="text-sm text-muted-foreground">Para movimentação X/Y</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Wifi className="h-4 w-4 mr-2" />
                        Conectividade
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Módulo WiFi</p>
                          <p className="text-sm text-muted-foreground">Embutido no Raspberry Pi</p>
                        </div>
                        <Badge>Incluído</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Câmera HD</p>
                          <p className="text-sm text-muted-foreground">Compatível com Raspberry Pi</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Cabo Ethernet</p>
                          <p className="text-sm text-muted-foreground">Recomendado para conexão estável</p>
                        </div>
                        <Badge variant="outline">Recomendado</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Roteador dedicado</p>
                          <p className="text-sm text-muted-foreground">Para múltiplas máquinas</p>
                        </div>
                        <Badge variant="outline">Opcional</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        Energia e Segurança
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Nobreak</p>
                          <p className="text-sm text-muted-foreground">Para evitar perda de conexão</p>
                        </div>
                        <Badge variant="outline">Recomendado</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Sensores de fim de curso</p>
                          <p className="text-sm text-muted-foreground">Para calibração automática</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Botão de emergência</p>
                          <p className="text-sm text-muted-foreground">Para parada imediata</p>
                        </div>
                        <Badge>Essencial</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Protetor de surto</p>
                          <p className="text-sm text-muted-foreground">Para proteção elétrica</p>
                        </div>
                        <Badge variant="outline">Recomendado</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    Estimativa de Custo
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    O custo total estimado para montar uma máquina completa é de aproximadamente:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Componentes essenciais:</p>
                      <p className="text-lg font-bold">R$ 1.500,00 - R$ 2.000,00</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Configuração completa:</p>
                      <p className="text-lg font-bold">R$ 2.500,00 - R$ 3.500,00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleDownload("lista_hardware.pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Lista Completa
                </Button>
                <Button onClick={() => setActiveTab("software")}>
                  Próximo: Software
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="software" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCode className="h-5 w-5 mr-2" />
                  Software e Configuração
                </CardTitle>
                <CardDescription>Softwares necessários e instruções de configuração</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Cog className="h-4 w-4 mr-2" />
                        Sistema Operacional
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium">Raspberry Pi OS (64-bit)</p>
                        <p className="text-sm text-muted-foreground">Sistema operacional oficial</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleDownload("raspberry_pi_os.img")}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Baixar Imagem
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs font-mono">
                          # Comando para gravar a imagem no cartão SD
                          <br />
                          sudo dd bs=4M if=raspberry_pi_os.img of=/dev/sdX status=progress
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Layers className="h-4 w-4 mr-2" />
                        Software de Controle
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium">Plush For You Controller</p>
                        <p className="text-sm text-muted-foreground">Software de controle da máquina</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleDownload("plush_controller.zip")}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Baixar Software
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs font-mono">
                          # Instalação do software de controle
                          <br />
                          unzip plush_controller.zip
                          <br />
                          cd plush_controller
                          <br />
                          sudo ./install.sh
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Configuração Inicial</AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-4 pl-5 list-decimal">
                        <li>
                          <p className="font-medium">Configurar o Raspberry Pi</p>
                          <p className="text-sm text-muted-foreground">
                            Execute o comando <code className="bg-muted px-1 rounded">sudo raspi-config</code> e
                            configure:
                          </p>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
                            <li>Habilite a interface da câmera</li>
                            <li>Configure o WiFi (se necessário)</li>
                            <li>Habilite SSH para acesso remoto</li>
                            <li>Expanda o sistema de arquivos para usar todo o cartão SD</li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Instalar dependências</p>
                          <div className="bg-muted p-3 rounded-lg mt-1">
                            <p className="text-xs font-mono">
                              sudo apt update
                              <br />
                              sudo apt install -y python3-pip python3-opencv git
                              <br />
                              pip3 install pyserial numpy websockets
                            </p>
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Configurar o Arduino</p>
                          <p className="text-sm text-muted-foreground">
                            Instale o Arduino IDE e carregue o firmware fornecido no pacote de software.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Configurar o serviço de inicialização automática</p>
                          <div className="bg-muted p-3 rounded-lg mt-1">
                            <p className="text-xs font-mono">
                              sudo cp plush_controller.service /etc/systemd/system/
                              <br />
                              sudo systemctl enable plush_controller.service
                              <br />
                              sudo systemctl start plush_controller.service
                            </p>
                          </div>
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Configuração da Câmera</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          A câmera é essencial para que os jogadores possam ver a máquina em tempo real. Siga estas
                          etapas para configurá-la:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">1. Posicionamento da câmera</p>
                            <p className="text-sm text-muted-foreground">
                              Posicione a câmera de forma que tenha uma visão clara de toda a área de jogo, incluindo a
                              garra e os prêmios.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">2. Conexão da câmera</p>
                            <p className="text-sm text-muted-foreground">
                              Conecte a câmera à porta CSI do Raspberry Pi. Certifique-se de que o cabo esteja bem
                              conectado.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">3. Teste da câmera</p>
                            <div className="bg-muted p-3 rounded-lg mt-1">
                              <p className="text-xs font-mono">
                                # Teste se a câmera está funcionando
                                <br />
                                raspistill -o test.jpg
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">4. Configuração de streaming</p>
                            <p className="text-sm text-muted-foreground">
                              O software Plush Controller já inclui configurações para streaming de vídeo de baixa
                              latência.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Configuração de Rede</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Uma conexão de rede estável é crucial para o funcionamento adequado da máquina. Recomendamos
                          usar uma conexão com fio (Ethernet) sempre que possível.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Configuração de IP Estático</h4>
                          <p className="text-xs font-mono mb-2">
                            # Edite o arquivo de configuração de rede
                            <br />
                            sudo nano /etc/dhcpcd.conf
                          </p>
                          <p className="text-xs font-mono">
                            # Adicione estas linhas ao final do arquivo
                            <br />
                            interface eth0
                            <br />
                            static ip_address=192.168.1.100/24
                            <br />
                            static routers=192.168.1.1
                            <br />
                            static domain_name_servers=8.8.8.8
                          </p>
                        </div>

                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Teste de Conectividade</p>
                            <p className="text-sm text-muted-foreground">
                              Após configurar a rede, execute o comando{" "}
                              <code className="bg-muted px-1 rounded">ping api.plushforyou.com</code> para verificar se
                              a máquina consegue se comunicar com nossos servidores.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("hardware")}>
                  Voltar: Hardware
                </Button>
                <Button onClick={() => setActiveTab("setup")}>
                  Próximo: Montagem
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Montagem e Calibração
                </CardTitle>
                <CardDescription>Instruções passo a passo para montagem e calibração da máquina</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                        1
                      </div>
                      <CardTitle className="text-lg">Montagem da Estrutura</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Monte a estrutura básica da máquina seguindo o diagrama de montagem fornecido.
                      </p>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground ml-2">Diagrama de Montagem</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
                        <li>Fixe os perfis de alumínio conforme o diagrama</li>
                        <li>Instale os trilhos para os eixos X e Y</li>
                        <li>Monte o sistema de polias e correias</li>
                        <li>Fixe os motores de passo nas posições indicadas</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                        2
                      </div>
                      <CardTitle className="text-lg">Instalação Eletrônica</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Instale os componentes eletrônicos seguindo o diagrama de conexões.
                      </p>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Cable className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground ml-2">Diagrama de Conexões</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
                        <li>Conecte os drivers A4988 ao Arduino</li>
                        <li>Conecte os motores de passo aos drivers</li>
                        <li>Instale o servo motor da garra</li>
                        <li>Conecte o Arduino ao Raspberry Pi via USB</li>
                        <li>Instale a câmera no Raspberry Pi</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20">
                    <CardHeader className="pb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                        3
                      </div>
                      <CardTitle className="text-lg">Calibração</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Calibre os motores e a garra para garantir o funcionamento correto.
                      </p>
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Cog className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground ml-2">Ferramenta de Calibração</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc pl-5">
                        <li>Execute o script de calibração</li>
                        <li>Ajuste os limites de movimento dos eixos X e Y</li>
                        <li>Calibre a força da garra</li>
                        <li>Teste o movimento em todas as direções</li>
                        <li>Verifique se os sensores de fim de curso estão funcionando</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Dicas de Montagem</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Certifique-se de que todos os parafusos estão bem apertados para evitar vibrações durante o
                        funcionamento.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Use abraçadeiras para organizar os cabos e evitar que interfiram no movimento da máquina.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Aplique graxa nas partes móveis para reduzir o atrito e aumentar a vida útil dos componentes.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Posicione a câmera de forma que tenha uma visão clara de toda a área de jogo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Suporte Técnico
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Se encontrar dificuldades durante a montagem ou calibração, nossa equipe de suporte técnico está
                    disponível para ajudar. Entre em contato pelo e-mail{" "}
                    <span className="font-medium">suporte@plushforyou.com</span> ou pelo telefone{" "}
                    <span className="font-medium">(11) 1234-5678</span>.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("software")}>
                  Voltar: Software
                </Button>
                <Button onClick={() => setActiveTab("api")}>
                  Próximo: API
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="h-5 w-5 mr-2" />
                  API e Integração
                </CardTitle>
                <CardDescription>Documentação da API para integração com a plataforma Plush For You</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Visão Geral da API</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa API permite que sua máquina física se comunique com a plataforma Plush For You, recebendo
                    comandos dos jogadores e enviando o status da máquina em tempo real.
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-background rounded-lg">
                      <p className="font-medium">Autenticação</p>
                      <p className="text-xs text-muted-foreground">Token JWT</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="font-medium">Formato</p>
                      <p className="text-xs text-muted-foreground">JSON / WebSockets</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="font-medium">Endpoint Base</p>
                      <p className="text-xs text-muted-foreground">api.plushforyou.com/v1</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Autenticação e Registro</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Antes de usar a API, você precisa registrar sua máquina e obter um token de autenticação.
                        </p>

                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Registrar uma nova máquina</p>
                          <p>POST /machines/register</p>
                          <p className="text-blue-400 mt-2">// Corpo da requisição</p>
                          <p>{`{`}</p>
                          <p>{`  "machine_name": "Máquina Kawaii #1",`}</p>
                          <p>{`  "machine_type": "standard",`}</p>
                          <p>{`  "owner_id": "seu_id_de_proprietário",`}</p>
                          <p>{`  "hardware_id": "raspberry_pi_serial_number"`}</p>
                          <p>{`}`}</p>
                          <p className="text-blue-400 mt-2">// Resposta</p>
                          <p>{`{`}</p>
                          <p>{`  "machine_id": "m_12345",`}</p>
                          <p>{`  "api_key": "pfyapi_abcdef123456",`}</p>
                          <p>{`  "status": "registered"`}</p>
                          <p>{`}`}</p>
                        </div>

                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Obter token de autenticação</p>
                          <p>POST /auth/token</p>
                          <p className="text-blue-400 mt-2">// Corpo da requisição</p>
                          <p>{`{`}</p>
                          <p>{`  "machine_id": "m_12345",`}</p>
                          <p>{`  "api_key": "pfyapi_abcdef123456"`}</p>
                          <p>{`}`}</p>
                          <p className="text-blue-400 mt-2">// Resposta</p>
                          <p>{`{`}</p>
                          <p>{`  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",`}</p>
                          <p>{`  "expires_in": 86400`}</p>
                          <p>{`}`}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Endpoints Principais</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Atualizar status da máquina</p>
                          <p>PUT /machines/{`{machine_id}`}/status</p>
                          <p className="text-blue-400 mt-2">// Corpo da requisição</p>
                          <p>{`{`}</p>
                          <p>{`  "status": "available", // available, in_use, maintenance, offline`}</p>
                          <p>{`  "current_player": null, // ID do jogador atual, se houver`}</p>
                          <p>{`  "health": {`}</p>
                          <p>{`    "cpu_temp": 45.2,`}</p>
                          <p>{`    "memory_usage": 32.5,`}</p>
                          <p>{`    "disk_space": 78.3`}</p>
                          <p>{`  }`}</p>
                          <p>{`}`}</p>
                        </div>

                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Receber comandos (WebSocket)</p>
                          <p>WS /machines/{`{machine_id}`}/commands</p>
                          <p className="text-blue-400 mt-2">// Exemplo de comando recebido</p>
                          <p>{`{`}</p>
                          <p>{`  "command": "move",`}</p>
                          <p>{`  "direction": "left", // up, down, left, right`}</p>
                          <p>{`  "player_id": "p_67890",`}</p>
                          <p>{`  "timestamp": 1623456789`}</p>
                          <p>{`}`}</p>
                          <p className="text-blue-400 mt-2">// Exemplo de comando de captura</p>
                          <p>{`{`}</p>
                          <p>{`  "command": "grab",`}</p>
                          <p>{`  "player_id": "p_67890",`}</p>
                          <p>{`  "timestamp": 1623456799`}</p>
                          <p>{`}`}</p>
                        </div>

                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Reportar resultado do jogo</p>
                          <p>POST /games/result</p>
                          <p className="text-blue-400 mt-2">// Corpo da requisição</p>
                          <p>{`{`}</p>
                          <p>{`  "machine_id": "m_12345",`}</p>
                          <p>{`  "player_id": "p_67890",`}</p>
                          <p>{`  "result": "win", // win, lose`}</p>
                          <p>{`  "prize": "Urso Kawaii",`}</p>
                          <p>{`  "timestamp": 1623456899,`}</p>
                          <p>{`  "game_duration": 45, // segundos`}</p>
                          <p>{`  "moves_count": 12`}</p>
                          <p>{`}`}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Streaming de Vídeo</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          O streaming de vídeo é gerenciado pelo nosso software Plush Controller, que utiliza WebRTC
                          para transmissão de baixa latência.
                        </p>

                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Iniciar streaming de vídeo</p>
                          <p>POST /machines/{`{machine_id}`}/stream/start</p>
                          <p className="text-blue-400 mt-2">// Corpo da requisição</p>
                          <p>{`{`}</p>
                          <p>{`  "resolution": "720p", // 480p, 720p, 1080p`}</p>
                          <p>{`  "fps": 30,`}</p>
                          <p>{`  "bitrate": 1500 // kbps`}</p>
                          <p>{`}`}</p>
                          <p className="text-blue-400 mt-2">// Resposta</p>
                          <p>{`{`}</p>
                          <p>{`  "stream_id": "str_12345",`}</p>
                          <p>{`  "stream_url": "rtmp://stream.plushforyou.com/live/m_12345",`}</p>
                          <p>{`  "status": "starting"`}</p>
                          <p>{`}`}</p>
                        </div>

                        <div className="bg-black text-white p-4 rounded-lg font-mono text-xs">
                          <p className="text-green-400 mb-2">// Parar streaming de vídeo</p>
                          <p>POST /machines/{`{machine_id}`}/stream/stop</p>
                          <p className="text-blue-400 mt-2">// Resposta</p>
                          <p>{`{`}</p>
                          <p>{`  "stream_id": "str_12345",`}</p>
                          <p>{`  "status": "stopped",`}</p>
                          <p>{`  "duration": 3600 // segundos`}</p>
                          <p>{`}`}</p>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm font-medium">Configuração Recomendada</p>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
                            <li>Resolução: 720p (1280x720)</li>
                            <li>FPS: 30</li>
                            <li>Bitrate: 1500 kbps</li>
                            <li>Codec: H.264</li>
                            <li>Iluminação: Certifique-se de que a área de jogo está bem iluminada</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Próximos Passos</h3>
                  <p className="text-sm text-green-700 mb-4">
                    Após concluir a montagem e configuração da sua máquina, siga estes passos para integrá-la à
                    plataforma:
                  </p>
                  <ol className="list-decimal pl-5 text-sm text-green-700 space-y-2">
                    <li>Registre sua máquina no painel de administração</li>
                    <li>Configure as credenciais de API no software Plush Controller</li>
                    <li>Inicie o serviço e verifique se a máquina aparece como "online" no painel</li>
                    <li>Realize um teste completo de jogo para verificar se tudo está funcionando corretamente</li>
                    <li>Configure os prêmios disponíveis na máquina através do painel de administração</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("setup")}>
                  Voltar: Montagem
                </Button>
                <Button variant="outline" onClick={() => handleDownload("documentacao_completa.pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Documentação Completa
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
