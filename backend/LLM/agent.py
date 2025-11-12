from google.adk.agents.llm_agent import Agent
from LLM.custom_agent_wrapper_function import build_agent

check_agent = build_agent(name="useless_agent",
                          desc="does nothing",
                          instr_file_path="LLM/agent_instructions/sub.txt")

root_agent = build_agent(llm="ollama/gemma3:12b",
                         name="manager",
                         desc="manages interactions between agents of the sub-agent system",
                         instr_file_path="LLM/agent_instructions/root.txt",
                         customtools=[],
                         subagents=[])